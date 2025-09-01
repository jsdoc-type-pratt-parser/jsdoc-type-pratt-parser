import { type ParsletFunction } from './Parslet';
import type { RootResult } from '../result/RootResult';
import type { IntermediateResult } from '../result/IntermediateResult';
import type { KeyValueResult } from '../result/NonRootResult';
export declare function getParameters(value: IntermediateResult): Array<RootResult | KeyValueResult>;
export declare function getUnnamedParameters(value: IntermediateResult): RootResult[];
export declare function createFunctionParslet({ allowNamedParameters, allowNoReturnType, allowWithoutParenthesis, allowNewAsFunctionKeyword }: {
    allowNamedParameters?: string[];
    allowWithoutParenthesis: boolean;
    allowNoReturnType: boolean;
    allowNewAsFunctionKeyword: boolean;
}): ParsletFunction;
