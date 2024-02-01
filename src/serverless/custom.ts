import type { SLSAwsCustom } from './types';

const webpack = {
  forceExclude: ['src/**/*.(test|spec).js', 'tests/**/*.(test|spec).js'],
  includeModules: true,
  keepOutputDirectory: true,
  packager: 'npm',
};

const custom: SLSAwsCustom = {
  webpack,
};

export default custom;
