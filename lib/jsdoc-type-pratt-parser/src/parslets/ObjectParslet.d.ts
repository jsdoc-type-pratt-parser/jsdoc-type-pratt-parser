import { type ParsletFunction } from './Parslet';
import type { Grammar } from '../grammars/Grammar';
export declare function createObjectParslet({ signatureGrammar, objectFieldGrammar, allowKeyTypes }: {
    signatureGrammar?: Grammar;
    objectFieldGrammar: Grammar;
    allowKeyTypes: boolean;
}): ParsletFunction;
