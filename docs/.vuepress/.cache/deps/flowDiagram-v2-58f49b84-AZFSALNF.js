import {
  flowRendererV2,
  flowStyles
} from "./chunk-CQDFY3CA.js";
import {
  flowDb,
  parser$1
} from "./chunk-MRPJBEFA.js";
import "./chunk-TIPQRFGQ.js";
import "./chunk-7N2XLO5R.js";
import "./chunk-HG67BHY3.js";
import "./chunk-5PMFZPGK.js";
import "./chunk-WI5S7EZ6.js";
import "./chunk-5GWSEPQV.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-SANNSNXC.js";
import {
  __toESM
} from "./chunk-USJHI7ER.js";

// node_modules/mermaid/dist/flowDiagram-v2-58f49b84.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-58f49b84-AZFSALNF.js.map
