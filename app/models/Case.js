import { generateId } from "../utils/generateId.js";

export class Case {
  constructor(data) {
    this.id = generateId();
    this.report = data.report || "no report";
    this.agency = data.agency;
    this.reportedDate = data.reportedDate
      ? new Date(data.reportedDate).toLocaleString()
      : new Date().toLocaleString();
    this.unlocked = data.unlocked ? data.unlocked : true;
  }

  get ListTemplate() {
    return /*html*/`
  <div class="col-6 col-lg-4 p-3">
    <div onClick="app.CasesController.setActiveCase('${this.id}')" class="row justify-content-center flex-column align-items-center p-3 briefcase">
      <div class="handle d-flex align-items-end justify-content-center">
        <div class="handle-hole "></div>
      </div>
      <div class="case d-flex align-items-center justify-content-center">
        <div class="py-2 fs-1">${this.agency}</div>
      </div>
    </div>    
  </div>
  `;
  }

  get ActiveCaseTemplate() {
    return `
  <div class="col-4 col-md-1">
    <button onClick="app.CasesController.resetCases()" class="btn btn-primary form-control rounded-pill">Back</button>
  </div>
  <div class="col-12 d-flex justify-content-between align-items-center my-2">
    <p class="fs-2 m-0">Agency: ${this.agency}</p>
    <button onClick="app.CasesController.unlockCase()" class="btn fs-2">🔓 Unlock</button>
    <p class="fs-2 m-0">${this.reportedDate}</p>
  </div>
  <div>
    <p id="case-content" class="col-12 bg-dark text-light rounded  fs-4">${this.report}</p>
  </div>
  `
  }

  get RedactedCaseTemplate() {
    return `
  <div class="col-4 col-md-1">
    <button onClick="app.CasesController.resetCases()" class="btn btn-primary form-control rounded-pill">Back</button>
  </div>
  <div class="col-12 d-flex justify-content-between align-items-center my-2">
    <p class="fs-2 m-0">Agency: ${this.agency}</p>
    <button onClick="app.CasesController.lockCase()" class="btn fs-2">🔒 Lock</button>
    <p class="fs-2 m-0">${this.reportedDate}</p>
  </div>
  <div>
    <textarea id="case-content" class="col-12 bg-dark text-light rounded  fs-4">${this.report}</textarea>
  </div>
  `
  }
}
