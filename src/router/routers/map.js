import ditich from "../../views/ditich/index.vue";
import disanvanhoa from "../../views/disanvanhoa/index.vue";
import thamquan from "../../views/thamquan/index.vue";

import { ROUTE_MAP } from "@/utils/constants";

export default [
  {
    path: ROUTE_MAP.DITICH,
    name: "ditich",
    component: ditich,
  },
  {
    path: ROUTE_MAP.DISAN,
    name: "disanvanhoa",
    component: disanvanhoa,
  },
  {
    path: ROUTE_MAP.THAMQUAN,
    name: "thamquan",
    component: thamquan,
  },
];
