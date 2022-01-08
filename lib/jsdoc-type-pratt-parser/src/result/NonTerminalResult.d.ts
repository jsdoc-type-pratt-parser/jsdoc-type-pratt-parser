import { QuoteStyle, TerminalResult } from './TerminalResult';
/**
 * A parse sub result that might not be a valid type expression on its own.
 */
export declare type NonTerminalResult = TerminalResult | KeyValueResult | JsdocObjectKeyValueResult | PropertyResult;
/**
 * A key value pair represented by a `:`. Can occur as a named parameter of a {@link FunctionResult} or as an entry for
 * an {@link ObjectResult}. Is a {@link NonTerminalResult}. {@link JsdocObjectKeyValueResult} uses the same type name
 * and will not have a `value` property.
 */
export interface KeyValueResult {
    type: 'JsdocTypeKeyValue';
    key: string;
    right: TerminalResult | undefined;
    optional: boolean;
    readonly: boolean;
    meta: {
        quote: QuoteStyle | undefined;
        hasLeftSideExpression: false;
    };
}
/**
 * A key value pair represented by a `:`. This particular variant of the `KEY_VALUE` type will only occur in `'jsdoc'`
 * parsing mode and can only occur in {@link ObjectResult}s. It can be differentiated from {@link KeyValueResult} by
 * the `left` property that will never appear on the latter.
 */
export interface JsdocObjectKeyValueResult {
    type: 'JsdocTypeKeyValue';
    left: TerminalResult;
    right: TerminalResult;
    meta: {
        hasLeftSideExpression: true;
    };
}
export interface PropertyResult {
    type: 'JsdocTypeProperty';
    value: string;
    meta: {
        quote: QuoteStyle | undefined;
    };
}
