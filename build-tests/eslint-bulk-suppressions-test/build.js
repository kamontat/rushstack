const { FileSystem, Executable, Text, Import } = require('@rushstack/node-core-library');
const {
  ESLINT_PACKAGE_NAME_ENV_VAR_NAME
} = require('@rushstack/eslint-patch/lib/eslint-bulk-suppressions/constants');

const eslintBulkStartPath = Import.resolveModule({
  modulePath: '@rushstack/eslint-bulk/lib/start',
  baseFolderPath: __dirname
});

function tryLoadSuppressions(suppressionsJsonPath) {
  try {
    return Text.convertToLf(FileSystem.readFile(suppressionsJsonPath)).trim();
  } catch (e) {
    if (FileSystem.isNotExistError(e)) {
      return '';
    } else {
      throw e;
    }
  }
}

const RUN_FOLDER_PATHS = ['client', 'server'];
const ESLINT_PACKAGE_NAMES = ['eslint', 'eslint-newest', 'eslint-oldest'];

const updateFilePaths = new Set();

for (const runFolderPath of RUN_FOLDER_PATHS) {
  const folderPath = `${__dirname}/${runFolderPath}`;
  const suppressionsJsonPath = `${folderPath}/.eslint-bulk-suppressions.json`;

  const folderItems = FileSystem.readFolderItems(folderPath);
  for (const folderItem of folderItems) {
    if (folderItem.isFile() && folderItem.name.match(/^\.eslint\-bulk\-suppressions\-[\d.]+\.json$/)) {
      const fullPath = `${folderPath}/${folderItem.name}`;
      updateFilePaths.add(fullPath);
    }
  }

  for (const eslintPackageName of ESLINT_PACKAGE_NAMES) {
    const { version: eslintVersion } = require(`${eslintPackageName}/package.json`);

    const startLoggingMessage = `-- Running eslint-bulk-suppressions for eslint@${eslintVersion} in ${runFolderPath} --`;
    const endLoggingMessage = '-'.repeat(startLoggingMessage.length);
    console.log(startLoggingMessage);
    const referenceSuppressionsJsonPath = `${folderPath}/.eslint-bulk-suppressions-${eslintVersion}.json`;
    const existingSuppressions = tryLoadSuppressions(referenceSuppressionsJsonPath);

    const executableResult = Executable.spawnSync(
      process.argv0,
      [eslintBulkStartPath, 'suppress', '--all', 'src'],
      {
        currentWorkingDirectory: folderPath,
        environment: {
          ...process.env,
          [ESLINT_PACKAGE_NAME_ENV_VAR_NAME]: eslintPackageName
        }
      }
    );

    console.log('STDOUT:');
    console.log(executableResult.stdout.toString());

    console.log('STDERR:');
    console.log(executableResult.stderr.toString());

    const newSuppressions = tryLoadSuppressions(suppressionsJsonPath);
    if (newSuppressions === existingSuppressions) {
      updateFilePaths.delete(referenceSuppressionsJsonPath);
    } else {
      updateFilePaths.add(referenceSuppressionsJsonPath);
      FileSystem.writeFile(referenceSuppressionsJsonPath, newSuppressions);
    }

    FileSystem.deleteFile(suppressionsJsonPath);

    console.log(endLoggingMessage);
    console.log();
  }
}

if (updateFilePaths.size > 0) {
  for (const updateFilePath of updateFilePaths) {
    console.log(`The suppressions file "${updateFilePath}" was updated and must be committed to git.`);
  }

  process.exit(1);
}