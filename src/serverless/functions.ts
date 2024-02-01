import type { SLSAwsFunction } from './types';
import path from 'path';

const LAMBDAS_PATH = 'src/serverless/lambdas/';
const handle_path = (...path_part: string[]) =>
  path.join(LAMBDAS_PATH, ...path_part);

export const apiEntrypoint: SLSAwsFunction = {
  handler: handle_path('apiEntrypoint.handler'),
  events: [
    {
      http: {
        method: 'ANY',
        path: '/api/{proxy+}',
        cors: true,
        private: true,
      },
    },
  ],
};

export const apiDocs: SLSAwsFunction = {
  handler: handle_path('apiEntrypointDocs.handler'),
  events: [
    {
      http: {
        method: 'GET',
        path: '/docs',
        cors: true,
      },
    },
  ],
};
