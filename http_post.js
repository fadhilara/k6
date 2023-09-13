import http from 'k6/http';
import { check } from "k6";

export default function () {
  const res_1 = http.get('https://fakerestapi.azurewebsites.net/api/v1/Activities');
    const checkOutput_1 = check(
      res_1,
      {
        'response code was 200': (res_1) => res_1.status == 200,
      },
    );

  const res_2 = http.post('https://fakerestapi.azurewebsites.net/api/v1/Activities');
  const payload = JSON.stringify({
    userId: '1',
    id: '21',
    title: 'finish task 4',
    completed: 'false'
  });
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  const checkOutput_2 = check(
    res_2,
    {
      'response code was 201': (res_2) => res_2.status == 201,
    },
  );
  
  const res = http.put('https://jsonplaceholder.typicode.com/todos/21');
  const payload = JSON.stringify({
    userId: '1',
    id: '21',
    title: 'finish read materi 8',
    completed: 'true'
  });
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  const checkOutput = check(
    res,
    {
      'response code was 200': (res) => res.status == 200,
    },
  );

  const res = http.del('https://dummy.restapiexample.com/api/v1/employees');
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const checkOutput = check(
    res,
    {
      'response code was 200': (res) => res.status == 200,
    },
  );
  //http.post(res, payload, params);
}