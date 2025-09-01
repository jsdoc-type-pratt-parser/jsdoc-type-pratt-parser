import { type ParsletFunction } from './Parslet';
import type { SpecialNamePathType } from '../result/RootResult';
import type { Grammar } from '../grammars/Grammar';
export declare function createSpecialNamePathParslet({ pathGrammar, allowedTypes }: {
    allowedTypes: SpecialNamePathType[];
    pathGrammar: Grammar;
}): ParsletFunction;
