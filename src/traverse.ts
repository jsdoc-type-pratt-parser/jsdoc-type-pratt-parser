import type { NonRootResult } from './result/NonRootResult.js'
import type { RootResult } from './result/RootResult.js'
import { visitorKeys } from './visitorKeys.js'

/**
 * A node visitor function.
 * @param node the visited node.
 * @param parentNode the parent node.
 * @param property the property on the parent node that contains the visited node. It can be the node itself or
 *  an array of nodes.
 */
export type NodeVisitor = (node: NonRootResult, parentNode?: NonRootResult, property?: string, index?: number) => void

/**
 * Custom visitor keys, keyed by node `type`. These take precedence over
 * the built-in `visitorKeys`, so they can be used to traverse
 * arbitrary structures (e.g., the ASTs of computed properties) or to alter the
 * keys visited for built-in types.
 */
export type CustomVisitorKeys = Record<string, readonly string[]>

function _traverse<T extends NonRootResult, U extends NonRootResult> (node: T, parentNode: U | undefined, property: keyof U | undefined, index: number | undefined, onEnter: NodeVisitor | undefined, onLeave: NodeVisitor | undefined, customKeys: CustomVisitorKeys | undefined): void {
  onEnter?.(node, parentNode, property as string, index)

  const keysToVisit = (customKeys?.[node.type] ?? (visitorKeys as CustomVisitorKeys)[node.type] ?? []) as Array<keyof T>

  for (const key of keysToVisit) {
    const value = node[key]
    if (value !== undefined) {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          _traverse(element as unknown as NonRootResult, node, key, index, onEnter, onLeave, customKeys)
        }
      } else if (value !== null && typeof value === 'object' && 'type' in value) {
        _traverse(value as unknown as NonRootResult, node, key, undefined, onEnter, onLeave, customKeys)
      }
    }
  }

  onLeave?.(node, parentNode, property as string, index)
}

/**
 * A function to traverse an AST. It traverses it depth first.
 * @param node the node to start traversing at.
 * @param onEnter node visitor function that will be called on entering the node. This corresponds to preorder traversing.
 * @param onLeave node visitor function that will be called on leaving the node. This corresponds to postorder traversing.
 * @param customVisitorKeys optional visitor keys by node type, checked before the built-in `visitorKeys`.
 */
export function traverse (node: RootResult, onEnter?: NodeVisitor, onLeave?: NodeVisitor, customVisitorKeys?: CustomVisitorKeys): void {
  _traverse(node, undefined, undefined, undefined, onEnter, onLeave, customVisitorKeys)
}
