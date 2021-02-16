import { Grammar } from './Grammar'
import { UnenclosedUnionParslet } from '../parslets/UnionParslets'
import { NameParslet } from '../parslets/NameParslet'
import { SpecialTypesParslet } from '../parslets/SpecialTypesParslet'
import { NullableParslet, PostfixNullableParslet } from '../parslets/NullableParslets'
import { VariadicParslet } from '../parslets/VariadicParslet'
import { FunctionParslet } from '../parslets/FunctionParslet'
import { RecordParslet } from '../parslets/RecordParslet'
import { ModuleParslet } from '../parslets/ModuleParslet'
import { GenericParslet } from '../parslets/GenericParslet'
import { OptionalParslet } from '../parslets/OptionalParslet'
import { PropertyPathParslet } from '../parslets/PropertyPathParslet'
import { ParenthesisParslet } from '../parslets/ParenthesisParslet'
import { KeyValueParslet } from '../parslets/KeyValueParslet'
import { NumberParslet } from '../parslets/NumberParslet'
import {ParameterListParslet} from "../parslets/ParameterListParslet";

export const baseGrammar: Grammar = () => {
  return {
    prefixParslets: [
      new NameParslet(),
      new SpecialTypesParslet(),
      new NullableParslet(),
      new VariadicParslet(),
      new RecordParslet(),
      new ModuleParslet(),
      new NumberParslet(),
      new ParenthesisParslet()
    ],
    infixParslets: [
      new ParameterListParslet(),
      new PropertyPathParslet(),
      new KeyValueParslet(),
      new GenericParslet(),
      new UnenclosedUnionParslet(),
      new OptionalParslet(),
      new PostfixNullableParslet(),
      new PropertyPathParslet()
    ]
  }
}
