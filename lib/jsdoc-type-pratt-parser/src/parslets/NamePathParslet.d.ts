import { type ParsletFunction } from './Parslet';
import { type Grammar } from '../grammars/Grammar';
export declare function createNamePathParslet({ allowJsdocNamePaths, pathGrammar }: {
    allowJsdocNamePaths: boolean;
    pathGrammar: Grammar | null;
}): ParsletFunction;
