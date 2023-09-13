import http from 'k6/http';
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    // vus: 800,
    // duration: '120s',
    stages: [
      { duration: '0.3m', target: 500 }, // simulate ramp-up of traffic from 1 to 500 users over 0.3 minute
      { duration: '0.4m', target: 500 }, // stay at 500 users for 0.4 minute
      { duration: '0.6m', target: 1000 }, // simulate ramp-up of traffic from 500 to 1000 users over 0.6 minute
      { duration: '1m', target: 2000 }, // simulate ramp-up to 2000 users over 1 minute
      { duration: '1.4m', target: 0 }, // simulate ramp-down to 0 users over 1.4 minute
    ],
    thresholds: {
      http_req_failed: ['rate<0.001'], // the error rate must be lower than 0.1%
      http_req_duration: ['p(90)<1800'], // 90% of requests must complete below 2000ms
      http_req_receiving: ['max<6000'], // max receive request below 17000ms
     },
};

// export const options = {
//   scenarios: {
//     shared_iter_scenario: {
//       executor: "shared-iterations",
//       vus: 100,
//       iterations: 200,
//       startTime: "0s",
//       gracefulStop: '25s'
//     },
//     per_vu_scenario: {
//       executor: "per-vu-iterations",
//       vus: 100,
//       iterations: 10,
//       startTime: "10s",
//       gracefulStop: '20s'
//     },
//   },
//   thresholds: {
//     http_req_failed: ['rate<0.001'], // the error rate must be lower than 0.1%
//     http_req_duration: ['p(90)<600'], // 90% of requests must complete below 500ms
//     http_req_receiving: ['max<150'], // slowest request below 800ms
//     iteration_duration: ['p(95)<20000'], // 95% of requests must complete below 10000ms
//    },
// };

export default function () {
  // method get all
  const res_1 = http.get('https://jsonplaceholder.typicode.com/users');
  const checkOutput_1 = check(
    res_1,
      {
        'verify success response of get all': (res_1) => res_1.status == 200,
      },
  );
  
  // method get by id
  const res_2 = http.get('https://jsonplaceholder.typicode.com/users/1');

  const checkOutput_2 = check(
    res_2,
      {
        'verify success response of get by id': (res_2) => res_2.status == 200,
      },
  );

  // method post
  const payload_1 = JSON.stringify({
    id: 11,
    name: 'amanda zahra',
    username: 'amanda.zahra',
    email: 'amanda.zahra@test.com',
    address: {
      street: 'jl. damai',
    },
    phone: '089876543321'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const res_3 = http.post('https://jsonplaceholder.typicode.com/users', payload_1, params);

  const checkOutput_3 = check(
    res_3,
    {
      'verify success response of post': (res_3) => res_3.status == 201,
    },
  );
}

export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}