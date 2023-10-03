import { AboutController } from "./controllers/AboutController.js";
import { CasesController } from "./controllers/CasesController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: CasesController,
    view: /*html*/`
    <div class="container-fluid">
      <div class="row mt-3 text-center">
        <div class="col-12">
          <p class="fs-2"><span id="cases-count"></span> cases on file. </p>
        </div>
      </div>
      <div id="cases" class="row p-3">
    

      </div>
    </div>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]