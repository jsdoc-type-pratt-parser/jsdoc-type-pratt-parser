import { ParsletFunction } from './Parslet';
import { TerminalResult } from '../result/TerminalResult';
import { IntermediateResult } from '../result/IntermediateResult';
import { KeyValueResult } from '../result/NonTerminalResult';
export declare function getParameters(value: IntermediateResult): Array<TerminalResult | KeyValueResult>;
export declare function getUnnamedParameters(value: IntermediateResult): TerminalResult[];
export declare function createFunctionParslet({ allowNamedParameters, allowNoReturnType, allowWithoutParenthesis }: {
    allowNamedParameters?: string[];
    allowWithoutParenthesis: boolean;
    allowNoReturnType: boolean;
}): ParsletFunction;
