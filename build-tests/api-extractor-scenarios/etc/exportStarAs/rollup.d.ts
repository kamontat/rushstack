/**
 * Returns the sum of adding `b` to `a`
 * @param a - first number
 * @param b - second number
 * @returns Sum of adding `b` to `a`
 * @public
 */
declare function add(a: number, b: number): number;

/**
 * Returns the sum of adding `b` to `a` for large integers
 * @param a - first number
 * @param b - second number
 * @returns Sum of adding `b` to `a`
 * @public
 */
declare function add_2(a: bigint, b: bigint): bigint;

export declare namespace calculator {
    export {
        add,
        subtract,
        calculatorVersion
    }
}

export declare namespace calculator2 {
    export {
        add_2 as add,
        subtract_2 as subtract,
        calculatorVersion
    }
}

/**
 * Returns the version of the calculator.
 * @public
 */
declare const calculatorVersion: string;

/**
 * Returns the sum of subtracting `b` from `a`
 * @param a - first number
 * @param b - second number
 * @returns Sum of subtract `b` from `a`
 * @beta
 */
declare function subtract(a: number, b: number): number;

/**
 * Returns the sum of subtracting `b` from `a` for large integers
 * @param a - first number
 * @param b - second number
 * @returns Sum of subtract `b` from `a`
 * @beta
 */
declare function subtract_2(a: bigint, b: bigint): bigint;

export { }
