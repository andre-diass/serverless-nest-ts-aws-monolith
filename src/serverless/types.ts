import type { AWS } from '@serverless/typescript';

type ExistingFunction = Exclude<AWS['functions'], undefined>;

export type SLSAwsFunction = ExistingFunction[keyof ExistingFunction];

export type SLSAwsCustom = AWS['custom'];

export type SLSAwsProvider = AWS['provider'];

export type SLSAwsPlugins = AWS['plugins'];
