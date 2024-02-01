import type { SLSAwsPlugins } from './types';

const plugins: SLSAwsPlugins = [
  'serverless-webpack',
  'serverless-iam-roles-per-function',
  'serverless-offline',
];

export default plugins;
