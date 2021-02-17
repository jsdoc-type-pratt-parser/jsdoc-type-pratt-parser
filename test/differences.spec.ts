import { expect } from 'chai'
import 'mocha'
import {miscDiffs} from "./fixtures/differences/misc";
import {Parser, ParserMode} from "../src";


describe('Differences between modes should be recognized', () => {
  for (const fixture of miscDiffs) {
    it(fixture.description, () => {
      let mode: ParserMode
      for (mode in fixture.modes) {
        const parser = new Parser({
          mode
        })
        const message = `parsing '${fixture.input}' in mode: '${mode}'`
        const parse = () => parser.parse(fixture.input)
        if (fixture.modes[mode]) {
          expect(parse, message).to.not.throw()
        } else {
          expect(parse, message).to.throw()
        }
      }
    })
  }
})
