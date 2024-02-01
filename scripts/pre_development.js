const path = require('node:path');
const { execSync } = require('node:child_process');
const { it } = require('node:test');
const assert = require('node:assert');
const yaml = require('yaml');

const command_output_buffer = execSync('npx serverless print --stage dev');
const serverless_output = yaml.parse(
  command_output_buffer.toString('utf-8'),
);
const package_configs = require('../package.json');

it('The serverless.service must be changed before begin the developments', () => {
  console.log(
    `- "serverless_output.service" = ${serverless_output.service}`,
  );
  assert.notEqual(serverless_output.service, undefined);
  assert.doesNotMatch(
    serverless_output.service,
    /serverless\-nest\-ts\-aws\-template/,
  );
});

it('The package_json.name must be changed before begin the developments', () => {
  assert.doesNotMatch(
    package_configs.name,
    /serverless\-nest\-ts\-aws\-template/,
  );
});
