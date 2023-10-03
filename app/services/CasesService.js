import { AppState } from "../AppState.js"
import { Case } from "../models/Case.js"
import { saveState } from "../utils/Store.js"

function _saveCase() {
  saveState('cases', AppState.cases)
}

class CasesService{

setActiveCase(caseId){
  console.log('[CASES SERVICE] Active Case ID:', caseId)
  const cases = AppState.cases
  const activeCase = cases.find((c) => c.id == caseId)
  console.log('[CASES SERVICE] Active Case:', activeCase)
  AppState.activeCase = activeCase
  console.log('[CASES SERVICE] AppState.activeCase:', AppState.activeCase)
}

unlockCase() {
  const activeCase = AppState.activeCase
  console.log('[CASES SERVICE] Unlocking Case Active Case:', activeCase)
  activeCase.unlocked = false
  console.log('[CASES SERVICE] Unlocking Case Active Case after unlock:', activeCase)
  AppState.emit("activeCase")
}

saveCase(newContent) {
  const activeCase = AppState.activeCase
  activeCase.report = newContent

  console.log('[CASES SERVICE] Saving case Active Case:', AppState.activeCase)
  console.log('[CASES SERVICE] Saving case Cases:', AppState.cases)

  _saveCase()
}

lockCase() {
  console.log('[CASES SERVICE] Locking the case')
  const activeCase = AppState.activeCase
  console.log('[CASES SERVICE] Active case before locked:', activeCase)
  activeCase.unlocked = true
  console.log('[CASES SERVICE] Active case after locked:', activeCase)
  AppState.emit("activeCase")
}

createCase(caseData) {
  console.log('[CASES SERVICE] Case Data:', caseData)

  const newCase = new Case(caseData)

  AppState.cases.push(newCase)
  console.log('[CASES SERVICE] AppState.cases:', AppState.cases)
  AppState.emit("cases")
  _saveCase()
}

}

export const casesService = new CasesService()

