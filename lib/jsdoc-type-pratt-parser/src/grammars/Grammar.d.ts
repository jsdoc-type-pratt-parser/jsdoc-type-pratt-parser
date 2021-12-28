import { InfixParslet, PrefixParslet } from '../parslets/Parslet';
export declare type Grammar = () => {
    prefixParslets: PrefixParslet[];
    infixParslets: InfixParslet[];
};
