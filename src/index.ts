/**
 * @package
 * This package provides a parser for jsdoc types.
 */

export * from './parse'
export type * from './result/RootResult'
export type * from './result/NonRootResult'
export { transform, type TransformRule, type TransformFunction, type TransformRules } from './transforms/transform'
export { catharsisTransform } from './transforms/catharsisTransform'
export { jtpTransform } from './transforms/jtpTransform'
export { stringify, stringifyRules } from './transforms/stringify'
export { identityTransformRules } from './transforms/identityTransformRules'
export * from './traverse'
export * from './visitorKeys'
