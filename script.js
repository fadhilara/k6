import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        contacts: {
          executor: 'ramping-vus',
          startVUs: 0,
          stages: [
            { duration: '15s', target: 50 },
            { duration: '25s', target: 100 },
            { duration: '40s', target: 0 },
          ],
          gracefulRampDown: '3s',
        },
      },
    };
export default function () {
  http.get('http://test.k6.io/public/crocodiles/');
  sleep(1);
}
