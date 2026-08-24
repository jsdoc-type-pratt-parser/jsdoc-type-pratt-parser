export type StringOrSourceNodeOrArrayArray = StringOrSourceNodeOrArray[];
export type StringOrSourceNodeOrArray = string | import("source-map").SourceNode | (string | import("source-map").SourceNode | StringOrSourceNodeOrArrayArray)[];
export type NestedStringArray = (string | import("source-map").SourceNode | NestedStringArray)[];
export type GenerateOptions = {
    file?: string;
    sourceContent?: string;
    indent: null;
    base: null;
    parse: null;
    comment: boolean;
    codegenFactory: () => CodeGenerator;
    format: {
        indent: {
            style: string;
            base: number;
            adjustMultilineComment: boolean;
        };
        newline: string;
        space: string;
        json: boolean;
        renumber: boolean;
        hexadecimal: boolean;
        quotes: "single" | "double" | "auto";
        escapeless: boolean;
        compact: boolean;
        parentheses: boolean;
        semicolons: boolean;
        safeConcatenation: boolean;
        preserveBlankLines: boolean;
    };
    moz: {
        comprehensionExpressionStartsWithAssignment: boolean;
        starlessGenerator: boolean;
    };
    sourceMap: null;
    sourceMapRoot: null;
    sourceMapWithCode: boolean;
    directive: boolean;
    raw: boolean;
    verbatim: null;
    sourceCode: null;
};
export class CodeGenerator {
    /**
     * @param {import('estree').Statement} stmt
     * @param {number} flags
     */
    maybeBlock(stmt: import("estree").Statement, flags: number): NestedStringArray | ";";
    /**
     * @param {import('estree').Statement} stmt
     * @param {StringOrSourceNodeOrArray} result
     */
    maybeBlockSuffix(stmt: import("estree").Statement, result: StringOrSourceNodeOrArray): StringOrSourceNodeOrArray[];
    /**
     * @param {import('estree').Node} node
     * @param {number} [precedence]
     * @param {number} [flags]
     */
    generatePattern(node: import("estree").Node, precedence?: number, flags?: number): string | import("source-map").SourceNode;
    /**
     * @param {(import('estree').ArrowFunctionExpression|import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration) & {
     *   rest?: import('estree').Identifier,
     *   defaults?: import('estree').Node[]
     * }} node
     */
    generateFunctionParams(node: (import("estree").ArrowFunctionExpression | import("estree").FunctionExpression | import("estree").FunctionDeclaration) & {
        rest?: import("estree").Identifier;
        defaults?: import("estree").Node[];
    }): NestedStringArray;
    /**
     * @param {import('estree').ArrowFunctionExpression|
     *   import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration} node
     */
    generateFunctionBody(node: import("estree").ArrowFunctionExpression | import("estree").FunctionExpression | import("estree").FunctionDeclaration): NestedStringArray;
    /**
     * @param {"in"|"of"} operator
     * @param {import('estree').ForInStatement|import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    generateIterationForStatement(operator: "in" | "of", stmt: import("estree").ForInStatement | import("estree").ForOfStatement, flags: number): NestedStringArray;
    /**
     * @param {import('estree').Expression|import('estree').PrivateIdentifier} expr
     * @param {boolean} computed
     */
    generatePropertyKey(expr: import("estree").Expression | import("estree").PrivateIdentifier, computed: boolean): (string | import("source-map").SourceNode)[];
    /**
     * @param {import('estree').Pattern} left
     * @param {import('estree').Node} right
     * @param {import('estree').AssignmentOperator} operator
     * @param {number} precedence
     * @param {number} flags
     */
    generateAssignment(left: import("estree").Pattern, right: import("estree").Node, operator: import("estree").AssignmentOperator, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @param {number} flags
     */
    semicolon(flags: number): "" | ";";
    /**
     * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} expr
     * @param {number|undefined} precedence
     * @param {number|undefined} flags
     * @returns {string | import('source-map').SourceNode}
     */
    generateExpression(expr: import("estree").Node | import("estree").MaybeNamedClassDeclaration | import("estree").MaybeNamedFunctionDeclaration, precedence: number | undefined, flags: number | undefined): string | import("source-map").SourceNode;
    /**
     * @param {(import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration) & {
     *   jsdoc?: import('@es-joy/jsdoccomment').JsdocBlock
     * }} stmt
     * @param {number} flags
     */
    generateStatement(stmt: (import("estree").Node | import("estree").MaybeNamedClassDeclaration | import("estree").MaybeNamedFunctionDeclaration) & {
        jsdoc?: import("@es-joy/jsdoccomment").JsdocBlock;
    }, flags: number): string | import("source-map").SourceNode;
    /** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)|null} */
    JsdocBlock: ((stmt: import("@es-joy/jsdoccomment").JsdocBlock) => string) | null;
}
export namespace CodeGenerator {
    export { Statement };
    export { Expression };
}
/**
 * @typedef {{
 *  file?: string,
 *  sourceContent?: string,
 *  indent: null,
 *  base: null,
 *  parse: null,
 *  comment: boolean,
 *  codegenFactory: () => CodeGenerator,
 *  format: {
 *    indent: {
 *      style: string,
 *      base: number,
 *      adjustMultilineComment: boolean
 *    },
 *    newline: string,
 *    space: string,
 *    json: boolean,
 *    renumber: boolean,
 *    hexadecimal: boolean,
 *    quotes: 'single'|'double'|'auto',
 *    escapeless: boolean,
 *    compact: boolean,
 *    parentheses: boolean,
 *    semicolons: boolean,
 *    safeConcatenation: boolean,
 *    preserveBlankLines: boolean
 *  },
 *  moz: {
 *    comprehensionExpressionStartsWithAssignment: boolean,
 *    starlessGenerator: boolean
 *  },
 *  sourceMap: null,
 *  sourceMapRoot: null,
 *  sourceMapWithCode: boolean,
 *  directive: boolean,
 *  raw: boolean,
 *  verbatim: null,
 *  sourceCode: null
 * }} GenerateOptions
 */
/**
 * @param {import('estree').Node} node
 * @param {GenerateOptions} options
 */
export function generate(node: import("estree").Node, options: GenerateOptions): any;
export namespace generate {
    let sourceMapModule: typeof import("source-map") | null;
}
export const attachComments: typeof estraverse.attachComments;
declare const PrecedenceCopy: any;
export namespace FORMAT_MINIFY {
    namespace indent {
        let style: string;
        let base: number;
    }
    let renumber: boolean;
    let hexadecimal: boolean;
    let quotes: string;
    let escapeless: boolean;
    let compact: boolean;
    let parentheses: boolean;
    let semicolons: boolean;
}
export namespace FORMAT_DEFAULTS {
    export namespace indent_1 {
        let style_1: string;
        export { style_1 as style };
        let base_1: number;
        export { base_1 as base };
        export let adjustMultilineComment: boolean;
    }
    export { indent_1 as indent };
    export let newline: string;
    export let space: string;
    export let json: boolean;
    let renumber_1: boolean;
    export { renumber_1 as renumber };
    let hexadecimal_1: boolean;
    export { hexadecimal_1 as hexadecimal };
    let quotes_1: "single" | "double" | "auto";
    export { quotes_1 as quotes };
    let escapeless_1: boolean;
    export { escapeless_1 as escapeless };
    let compact_1: boolean;
    export { compact_1 as compact };
    let parentheses_1: boolean;
    export { parentheses_1 as parentheses };
    let semicolons_1: boolean;
    export { semicolons_1 as semicolons };
    export let safeConcatenation: boolean;
    export let preserveBlankLines: boolean;
}
declare namespace Statement {
    let JsdocBlock: ((stmt: import("@es-joy/jsdoccomment").JsdocBlock) => string) | null;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').BlockStatement} stmt
     * @param {number} flags
     */
    function BlockStatement(this: CodeGenerator, stmt: import("estree").BlockStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').BreakStatement} stmt
     * @param {number} flags
     */
    function BreakStatement(this: CodeGenerator, stmt: import("estree").BreakStatement, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ContinueStatement} stmt
     * @param {number} flags
     */
    function ContinueStatement(this: CodeGenerator, stmt: import("estree").ContinueStatement, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassBody} stmt
     * @param {number} flags
     */
    function ClassBody(this: CodeGenerator, stmt: import("estree").ClassBody, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassDeclaration} stmt
     * @param {number} flags
     */
    function ClassDeclaration(this: CodeGenerator, stmt: import("estree").ClassDeclaration, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   raw?: string,
     *   directive: string
     * }} stmt
     * @param {number} flags
     */
    function DirectiveStatement(this: CodeGenerator, stmt: import("estree").Node & {
        raw?: string;
        directive: string;
    }, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').DoWhileStatement} stmt
     * @param {number} flags
     */
    function DoWhileStatement(this: CodeGenerator, stmt: import("estree").DoWhileStatement, flags: number): StringOrSourceNodeOrArray[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').CatchClause & {
     *   guard: import('estree').BinaryExpression
     * }} stmt
     * @param {number} flags
     */
    function CatchClause(this: CodeGenerator, stmt: import("estree").CatchClause & {
        guard: import("estree").BinaryExpression;
    }, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').DebuggerStatement} stmt
     * @param {number} flags
     */
    function DebuggerStatement(this: CodeGenerator, stmt: import("estree").DebuggerStatement, flags: number): string;
    /**
     * @param {import('estree').EmptyStatement} stmt
     * @param {number} flags
     */
    function EmptyStatement(stmt: import("estree").EmptyStatement, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportDefaultDeclaration} stmt
     * @param {number} flags
     */
    function ExportDefaultDeclaration(this: CodeGenerator, stmt: import("estree").ExportDefaultDeclaration, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportNamedDeclaration} stmt
     * @param {number} flags
     */
    function ExportNamedDeclaration(this: CodeGenerator, stmt: import("estree").ExportNamedDeclaration, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportAllDeclaration} stmt
     * @param {number} flags
     */
    function ExportAllDeclaration(this: CodeGenerator, stmt: import("estree").ExportAllDeclaration, flags: number): (string | import("source-map").SourceNode)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExpressionStatement} stmt
     * @param {number} flags
     */
    function ExpressionStatement(this: CodeGenerator, stmt: import("estree").ExpressionStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportDeclaration} stmt
     * @param {number} flags
     */
    function ImportDeclaration(this: CodeGenerator, stmt: import("estree").ImportDeclaration, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclarator} stmt
     * @param {number} flags
     */
    function VariableDeclarator(this: CodeGenerator, stmt: import("estree").VariableDeclarator, flags: number): string | import("source-map").SourceNode | (string | import("source-map").SourceNode)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclaration} stmt
     * @param {number} flags
     */
    function VariableDeclaration(this: CodeGenerator, stmt: import("estree").VariableDeclaration, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ThrowStatement} stmt
     * @param {number} flags
     */
    function ThrowStatement(this: CodeGenerator, stmt: import("estree").ThrowStatement, flags: number): (string | StringOrSourceNodeOrArray[])[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').TryStatement & {
     *   handlers?: (import('estree').CatchClause)[],
     *   guardedHandlers?: (import('estree').CatchClause)[],
     * }} stmt
     * @param {number} flags
     */
    function TryStatement(this: CodeGenerator, stmt: import("estree").TryStatement & {
        handlers?: (import("estree").CatchClause)[];
        guardedHandlers?: (import("estree").CatchClause)[];
    }, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchStatement} stmt
     * @param {number} flags
     */
    function SwitchStatement(this: CodeGenerator, stmt: import("estree").SwitchStatement, flags: number): (string | (string | import("source-map").SourceNode | NestedStringArray)[])[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchCase} stmt
     * @param {number} flags
     */
    function SwitchCase(this: CodeGenerator, stmt: import("estree").SwitchCase, flags: number): undefined;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').IfStatement} stmt
     * @param {number} flags
     */
    function IfStatement(this: CodeGenerator, stmt: import("estree").IfStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForStatement} stmt
     * @param {number} flags
     */
    function ForStatement(this: CodeGenerator, stmt: import("estree").ForStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForInStatement} stmt
     * @param {number} flags
     */
    function ForInStatement(this: CodeGenerator, stmt: import("estree").ForInStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    function ForOfStatement(this: CodeGenerator, stmt: import("estree").ForOfStatement, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').LabeledStatement} stmt
     * @param {number} flags
     */
    function LabeledStatement(this: CodeGenerator, stmt: import("estree").LabeledStatement, flags: number): (string | NestedStringArray)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').Program} stmt
     * @param {number} flags
     */
    function Program(this: CodeGenerator, stmt: import("estree").Program, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionDeclaration} stmt
     * @param {number} flags
     */
    function FunctionDeclaration(this: CodeGenerator, stmt: import("estree").FunctionDeclaration, flags: number): (string | import("source-map").SourceNode | NestedStringArray)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ReturnStatement} stmt
     * @param {number} flags
     */
    function ReturnStatement(this: CodeGenerator, stmt: import("estree").ReturnStatement, flags: number): (string | StringOrSourceNodeOrArray[])[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').WhileStatement} stmt
     * @param {number} flags
     */
    function WhileStatement(this: CodeGenerator, stmt: import("estree").WhileStatement, flags: number): (string | NestedStringArray)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').WithStatement} stmt
     * @param {number} flags
     */
    function WithStatement(this: CodeGenerator, stmt: import("estree").WithStatement, flags: number): (string | NestedStringArray)[];
}
declare namespace Expression {
    /**
     * @this {CodeGenerator}
     * @param {import('estree').SequenceExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function SequenceExpression(this: CodeGenerator, expr: import("estree").SequenceExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function AssignmentExpression(this: CodeGenerator, expr: import("estree").AssignmentExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrowFunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ArrowFunctionExpression(this: CodeGenerator, expr: import("estree").ArrowFunctionExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ConditionalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ConditionalExpression(this: CodeGenerator, expr: import("estree").ConditionalExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @param {import('estree').LogicalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function LogicalExpression(expr: import("estree").LogicalExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').BinaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function BinaryExpression(this: CodeGenerator, expr: import("estree").BinaryExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').CallExpression & {
     *   optional?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function CallExpression(this: CodeGenerator, expr: import("estree").CallExpression & {
        optional?: boolean;
    }, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ChainExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ChainExpression(this: CodeGenerator, expr: import("estree").ChainExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').NewExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function NewExpression(this: CodeGenerator, expr: import("estree").NewExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').MemberExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function MemberExpression(this: CodeGenerator, expr: import("estree").MemberExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @param {import('estree').MetaProperty} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function MetaProperty(expr: import("estree").MetaProperty, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').UnaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function UnaryExpression(this: CodeGenerator, expr: import("estree").UnaryExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').YieldExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function YieldExpression(this: CodeGenerator, expr: import("estree").YieldExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').AwaitExpression & {
     *   all?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function AwaitExpression(this: CodeGenerator, expr: import("estree").AwaitExpression & {
        all?: boolean;
    }, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').UpdateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function UpdateExpression(this: CodeGenerator, expr: import("estree").UpdateExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function FunctionExpression(this: CodeGenerator, expr: import("estree").FunctionExpression, precedence: number, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ArrayPattern(this: CodeGenerator, expr: import("estree").ArrayPattern, precedence: number, flags: number): (string | import("source-map").SourceNode | StringOrSourceNodeOrArrayArray)[] | "[]";
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayExpression|import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     * @param {boolean} [isPattern]
     */
    function ArrayExpression(this: CodeGenerator, expr: import("estree").ArrayExpression | import("estree").ArrayPattern, precedence: number, flags: number, isPattern?: boolean): (string | import("source-map").SourceNode | StringOrSourceNodeOrArrayArray)[] | "[]";
    /**
     * @this {CodeGenerator}
     * @param {import('estree').RestElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function RestElement(this: CodeGenerator, expr: import("estree").RestElement, precedence: number, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ClassExpression(this: CodeGenerator, expr: import("estree").ClassExpression, precedence: number, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').MethodDefinition} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function MethodDefinition(this: CodeGenerator, expr: import("estree").MethodDefinition, precedence: number, flags: number): StringOrSourceNodeOrArray[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').Property} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function Property(this: CodeGenerator, expr: import("estree").Property, precedence: number, flags: number): any;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ObjectExpression(this: CodeGenerator, expr: import("estree").ObjectExpression, precedence: number, flags: number): (string | import("source-map").SourceNode)[] | "{}";
    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function AssignmentPattern(this: CodeGenerator, expr: import("estree").AssignmentPattern, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ObjectPattern(this: CodeGenerator, expr: import("estree").ObjectPattern, precedence: number, flags: number): (string | import("source-map").SourceNode | StringOrSourceNodeOrArrayArray)[] | "{}";
    /**
     * @param {import('estree').ThisExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ThisExpression(expr: import("estree").ThisExpression, precedence: number, flags: number): string;
    /**
     * @param {import('estree').Super} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function Super(expr: import("estree").Super, precedence: number, flags: number): string;
    /**
     * @param {import('estree').Identifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function Identifier(expr: import("estree").Identifier, precedence: number, flags: number): string | import("source-map").SourceNode;
    /**
     * @param {import('estree').ImportDefaultSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ImportDefaultSpecifier(expr: import("estree").ImportDefaultSpecifier, precedence: number, flags: number): string | import("source-map").SourceNode;
    /**
     * @param {import('estree').ImportNamespaceSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ImportNamespaceSpecifier(expr: import("estree").ImportNamespaceSpecifier, precedence: number, flags: number): string[];
    /**
     * @param {import('estree').ImportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ImportSpecifier(expr: import("estree").ImportSpecifier, precedence: number, flags: number): string[];
    /**
     * @param {import('estree').ExportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ExportSpecifier(expr: import("estree").ExportSpecifier, precedence: number, flags: number): string[];
    /**
     * @param {import('estree').Literal & {
     *   bigint?: string,
     *   regex?: {
     *     pattern: string,
     *     flags: string
     *   }
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function Literal(expr: import("estree").Literal & {
        bigint?: string;
        regex?: {
            pattern: string;
            flags: string;
        };
    }, precedence: number, flags: number): string | undefined;
    /**
     * @param {import('estree').Node} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function GeneratorExpression(expr: import("estree").Node, precedence: number, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   body: import('estree').Expression
     *   blocks: import('estree').Expression[]
     *   filter?: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ComprehensionExpression(this: CodeGenerator, expr: import("estree").Node & {
        body: import("estree").Expression;
        blocks: import("estree").Expression[];
        filter?: import("estree").Expression;
    }, precedence: number, flags: number): NestedStringArray;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   left: import('estree').VariableDeclaration|import('estree').Expression,
     *   of: boolean,
     *   right: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ComprehensionBlock(this: CodeGenerator, expr: import("estree").Node & {
        left: import("estree").VariableDeclaration | import("estree").Expression;
        of: boolean;
        right: import("estree").Expression;
    }, precedence: number, flags: number): (string | StringOrSourceNodeOrArray[])[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').SpreadElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function SpreadElement(this: CodeGenerator, expr: import("estree").SpreadElement, precedence: number, flags: number): (string | import("source-map").SourceNode)[];
    /**
     * @this {CodeGenerator}
     * @param {import('estree').TaggedTemplateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function TaggedTemplateExpression(this: CodeGenerator, expr: import("estree").TaggedTemplateExpression, precedence: number, flags: number): StringOrSourceNodeOrArray;
    /**
     * @param {import('estree').TemplateElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function TemplateElement(expr: import("estree").TemplateElement, precedence: number, flags: number): string;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').TemplateLiteral} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function TemplateLiteral(this: CodeGenerator, expr: import("estree").TemplateLiteral, precedence: number, flags: number): (string | import("source-map").SourceNode)[];
    /**
     * @param {import('estree').Literal} expr
     * @param {number} precedence
     * @param {number} flags
     */
    function ModuleSpecifier(expr: import("estree").Literal, precedence: number, flags: number): string | undefined;
    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportExpression} expr
     * @param {number} precedence
     * @param {number} flag
     */
    function ImportExpression(this: CodeGenerator, expr: import("estree").ImportExpression, precedence: number, flag: number): StringOrSourceNodeOrArray;
}
import * as estraverse from '@es-joy/estraverse';
export { PrecedenceCopy as Precedence };
//# sourceMappingURL=escodegen.d.ts.map