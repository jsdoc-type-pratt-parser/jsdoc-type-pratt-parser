import { NonRootResult } from './result/NonRootResult';
import { RootResult } from './result/RootResult';
declare type NodeVisitor = (node: NonRootResult, parentNode?: NonRootResult, property?: string) => void;
export declare function traverse(node: RootResult, onEnter?: NodeVisitor, onLeave?: NodeVisitor): void;
export {};
