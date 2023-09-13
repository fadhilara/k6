import http from "k6/http";

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 20,
      iterations: 200,
      startTime: "0s",
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 20,
      iterations: 20,
      startTime: "20s",
    },
  },
};

export default function () {
  http.get("https://test.k6.io/");
}