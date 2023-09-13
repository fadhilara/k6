import http from 'k6/http';
import { check } from "k6";
//import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


// export const options = {
//     vus: 100,
//     duration: '50s',
//     // stages: [
//     //   { duration: '0.3m', target: 200 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
//     //   { duration: '0.6m', target: 400 }, // stay at 400 users for 0.6 minute
//     //   { duration: '0.9m', target: 0 }, // ramp-down to 0 users
//     // ],
//    thresholds: {
//       http_req_duration: ['p(90)<250'], // 90% of requests must complete below 250ms
//       //http_req_duration: ['p(90)<1000'], // 90% of requests must complete below 1s
//     },
//    };

export default function () {
  // method get all
  const res_1 = http.get('https://fakerestapi.azurewebsites.net/api/v1/Activities');
  const checkOutput_1 = check(
    res_1,
      {
        'verify success response of get all': (res_1) => res_1.status == 200,
      },
  );
  
  // method get by id
  const res_2 = http.get('https://fakerestapi.azurewebsites.net/api/v1/Activities/4');

  const checkOutput_2 = check(
    res_2,
      {
        'verify success response of get by id': (res_2) => res_2.status == 200,
        'verify success get id : 4': (res_2 )=> res_2.body.includes(4),
        'verify success get title : Activity 4': (res_2) => res_2.body.includes('Activity 4'),
        'verify success get completed : true': (res_2) => res_2.body.includes(true)
      },
  );

  // method post
  const payload_1 = JSON.stringify({
    id: 2,
    title: 'finish course k6',
    dueDate: '2023-04-30T10:00:00Z',
    completed: false
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const res_3 = http.post('https://fakerestapi.azurewebsites.net/api/v1/Activities', payload_1, params);

  const checkOutput_3 = check(
    res_3,
    {
      'verify success response of post': (res_3) => res_3.status == 200,
      'verify success insert id : 2': (res_3 )=> res_3.body.includes(2),
      'verify success insert title : finish course k6': (res_3) => res_3.body.includes('finish course k6'),
      'verify success insert dueDate : 2023-04-30T10:00:00Z': (res_3) => res_3.body.includes('2023-04-30T10:00:00Z'),
      'verify success insert completed : false': (res_3) => res_3.body.includes(false)
    },
  );
  
  // method put
  const payload_2 = JSON.stringify({
    dueDate: '2023-04-29T10:00:00Z'
  });

  const res_4 = http.put('https://fakerestapi.azurewebsites.net/api/v1/Activities/2', payload_2, params);
  
  const checkOutput_4 = check(
    res_4,
    {
      'verify success response of put': (res_4) => res_4.status == 200,
      'verify success update dueDate : 2023-04-29T10:00:00Z': (res_4) => res_4.body.includes('2023-04-29T10:00:00Z'),
    },
  );

  // method delete
  const res_5 = http.del('https://fakerestapi.azurewebsites.net/api/v1/Activities/2');

  const checkOutput_5 = check(
    res_5,
    {
      'verify success response of delete': (res_5) => res_5.status == 200,
    },
  );
}

// export function handleSummary(data) {
//   return {
//     "report.html": htmlReport(data),
//   };
// }