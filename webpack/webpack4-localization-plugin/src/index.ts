// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

export { LocalizationPlugin, type IStringPlaceholder as _IStringPlaceholder } from './LocalizationPlugin';

export type {
  IDefaultLocaleOptions,
  ILocaleData,
  ILocaleElementMap,
  ILocaleFileData,
  ILocalizationPluginOptions,
  ILocalizationStats,
  ILocalizationStatsChunkGroup,
  ILocalizationStatsEntrypoint,
  ILocalizationStatsOptions,
  ILocalizedData,
  ILocalizedStrings,
  IPassthroughLocaleOptions,
  IPseudolocalesOptions,
  IResolvedMissingTranslations,
  ITypingsGenerationOptions
} from './interfaces';

export type { ILocalizedWebpackChunk } from './webpackInterfaces';
