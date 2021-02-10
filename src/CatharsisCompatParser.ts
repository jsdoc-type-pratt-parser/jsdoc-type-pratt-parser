import { Parser } from './Parser';

const TypeMap: { [key: string]: string } = {
    'ALL': 'AllLiteral',
    'FIELD': 'FieldType',
    'FUNCTION': 'FunctionType',
    'NAME': 'NameExpression',
    'NULL': 'NullLiteral',
    'RECORD': 'RecordType',
    'GENERIC': 'TypeApplication',
    'UNION': 'TypeUnion',
    'UNDEFINED': 'UndefinedLiteral',
    'UNKNOWN': 'UnknownLiteral'
};

const reservedWords = [
    'null',
    'true',
    'false',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield'
];

export class CatharsisCompatParser {
    private parser: Parser;

    constructor(text: string) {
        this.parser = new Parser(text);
    }

    static renameProperty(object: any, oldProp: string, newProp: string, transform?: boolean) {
        if (object[oldProp] !== undefined) {
            let value = object[oldProp];
            if (transform) {
                if (Array.isArray(value)) {
                    for (const v of value) {
                        CatharsisCompatParser.transformResult(v);
                    }
                } else {
                    CatharsisCompatParser.transformResult(value);
                }
            }
            object[newProp] = value;
            delete object[oldProp];
        }
        return object;
    }

    static transformResult(object: any) {
        if (object !== undefined) {
            if (Array.isArray(object)) {
                for (const item of object) {
                    CatharsisCompatParser.transformResult(item);
                }
            } else {
                if (object.type === 'NAME') {
                    if (reservedWords.includes(object.name)) {
                        object.reservedWord = true;
                    }
                }
                object.type = TypeMap[object.type];
                CatharsisCompatParser.renameProperty(object, 'parameters', 'params', true);
                CatharsisCompatParser.renameProperty(object, 'returnType', 'result', true);
                CatharsisCompatParser.renameProperty(object, 'thisType', 'this', true);
                CatharsisCompatParser.renameProperty(object, 'newType', 'new', true);
                CatharsisCompatParser.renameProperty(object, 'objects', 'applications', true);
                CatharsisCompatParser.renameProperty(object, 'subject', 'expression', true);
                CatharsisCompatParser.transformResult(object.fields);
                CatharsisCompatParser.transformResult(object.elements);
                CatharsisCompatParser.transformResult(object.key);
                CatharsisCompatParser.transformResult(object.value);
            }
        }
        return object;
    }


    parseType(): any {
        const result = this.parser.parseType();
        CatharsisCompatParser.transformResult(result);
        return result;
    }
}
