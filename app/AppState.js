import { Case } from "./models/Case.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./models/Case.js').Case[]} */
  cases = [
    new Case({
      agency: "👻👻👻",
      report: "Test1"
    }),
    new Case({
      agency: "🪦🪦🪦",
      report: "Test2"
    }),
    new Case({
      agency: "🎃🎃🎃",
      report: "Test3"
    })
  ]

  /** @type {import('./models/Case.js').Case|null} */
  activeCase = null

  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
