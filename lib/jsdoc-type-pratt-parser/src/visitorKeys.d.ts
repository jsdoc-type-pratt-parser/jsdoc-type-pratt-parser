import { NonRootResult } from './result/NonRootResult';
declare type VisitorKeys = {
    [P in NonRootResult as P['type']]: Array<keyof P>;
};
export declare const visitorKeys: VisitorKeys;
export {};
