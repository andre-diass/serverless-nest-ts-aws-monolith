import type { SLSAwsProvider } from './types';

const provider: SLSAwsProvider = {
  environment: "${file(./config/env/.env.${opt:stage, 'lcl'}.js)}" as any,
  region: 'us-east-1',
  logRetentionInDays: 5,
  memorySize: 512,
  name: 'aws',
  runtime: 'nodejs18.x',
  stage: "${opt:stage, 'lcl'}",
  timeout: 30,
  apiGateway: {
    apiKeys: [
      {
        name: "${opt:stage, 'lcl'}-internal",
        description: 'Api key used for internal services',
        enabled: true,
      },
    ],
  },
};

export default provider;
