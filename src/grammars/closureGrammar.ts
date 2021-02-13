import { Grammar } from './Grammar'
import { EnclosedUnionParslet, UnenclosedUnionParslet } from '../parslets/UnionParslets'
import { NameParslet } from '../parslets/NameParslet'
import { SpecialTypesParslet } from '../parslets/SpecialTypesParslet'
import { NullableParslet, PostfixNullableParslet } from '../parslets/NullableParslets'
import { StringValueParslet } from '../parslets/StringValueParslet'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { RecordParslet } from '../parslets/RecordParslet'
import { ModuleParslet } from '../parslets/ModuleParslet'
import { GenericParslet } from '../parslets/GenericParslet'
import { OptionalParslet } from '../parslets/OptionalParslet'
import { PropertyPathParslet } from '../parslets/PropertyPathParslet'

export const closureGrammar: Grammar = () => {
  return {
    prefixParslets: [
      new EnclosedUnionParslet(),
      new NameParslet(),
      new SpecialTypesParslet(),
      new NullableParslet(),
      new StringValueParslet(),
      new VariadicParslet(),
      new FunctionParslet(),
      new RecordParslet(),
      new ModuleParslet()
    ],
    infixParslets: [
      new GenericParslet(),
      new UnenclosedUnionParslet(),
      new OptionalParslet(),
      new PostfixNullableParslet(),
      new PropertyPathParslet()
    ]
  }
}
