import { AppState } from "../AppState.js";
import { casesService } from "../services/CasesService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCases() {
  let cases = AppState.cases
  let template = ''
  cases.forEach((c) => template += c.ListTemplate)
  setHTML('cases', template)
  setHTML('cases-count', cases.length)
}

// NOTE OLD WAY OF USING TEMPLATE ^^^^^^^^^^^ NEW WAY ABOVE
// `
//   <div  class="col-6 col-lg-4 p-3">
//     <div onClick="app.CasesController.setActiveCase('${c.id}')" class="row justify-content-center flex-column align-items-center p-3 briefcase">
//     <div class="handle d-flex align-items-end justify-content-center">
//      <div class="handle-hole "></div>
//     </div>
//     <div class="case d-flex align-items-center justify-content-center">
//        <div class="py-2 fs-1">${c.agency}</div>
//     </div>
//   </div>    
//   </div>
//   `

function _drawActiveCase() {
  let activeCase = AppState.activeCase
  console.log('[CASES CONTROLLER] Drawing Active Case:', activeCase)

  if(activeCase.unlocked) {
    setHTML('cases', activeCase.ActiveCaseTemplate)
  } else {
    setHTML('cases', activeCase.RedactedCaseTemplate)
  }
}

// NOTE OLD WAY TO DRAW AN ACTIVE ITEM FOR ABOVE ^^^^^^^^
  // let template = `
  // <div class="col-1">
  // <button onClick="app.CasesController.resetCases()" class="btn btn-primary form-control rounded-pill">Back</button>
  // </div>
  // <div class="col-12 d-flex justify-content-between">
  //   <p class="fs-2">Agency: ${activeCase.agency}</p>
  //   <p class="fs-2">${activeCase.reportedDate}</p>
  //   <p></p>
  // </div>
  // <div>
  // <textarea class="col-12 bg-dark text-light rounded  fs-4">${activeCase.report}</textarea>
  // </div>
  // `
  // setHTML('cases', template)

export class CasesController {
  constructor() {
    Pop.success('Welcome to the Cases Page')
    _drawCases()
    AppState.on('activeCase', _drawActiveCase)
  }

  testButton() {
    Pop.success('The BUTTON works!')
  }

  setActiveCase(caseId) {
    Pop.success(`[SETTING ACTIVE CASE ID]: ${caseId}`)
    casesService.setActiveCase(caseId)
  }

  resetCases() {
    console.log('[CASES CONTROLLER] Resetting Cases')
    _drawCases()
  }

  unlockCase() {
    console.log('[CASES CONTROLLER] Unlocking Case')
    casesService.unlockCase()

    const reportElm = document.getElementById('case-content')
    console.log('[CASES CONTROLLER] Unlocking case report element:', reportElm)
    reportElm.focus()
    reportElm.setSelectionRange(reportElm.value.length, reportElm.value.length)

    // NOTE re lock after time
    // setTimeout(this.lockCase, 10000)
  }

  lockCase() {
    console.log('[CASES CONTROLLER] Locking Case')
    let newContent = document.getElementById('case-content').value
    console.log('[CASES CONTROLLER] Locking Case Contents:', newContent)
  
    casesService.saveCase(newContent)
    casesService.lockCase()
  }
}