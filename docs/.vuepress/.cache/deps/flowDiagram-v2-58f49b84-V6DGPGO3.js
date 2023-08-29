import {
  flowRendererV2,
  flowStyles
} from "./chunk-7GNHOSOD.js";
import {
  flowDb,
  parser$1
} from "./chunk-ABDU5TP3.js";
import "./chunk-KHJQ2S35.js";
import "./chunk-N5QCKCX5.js";
import "./chunk-RYWXS5LX.js";
import "./chunk-DNA4VMNY.js";
import "./chunk-PCZSYB3U.js";
import "./chunk-F4NGM7BG.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-2TWPK5VJ.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

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
//# sourceMappingURL=flowDiagram-v2-58f49b84-V6DGPGO3.js.map
