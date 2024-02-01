import type { Callback, Context, Handler } from 'aws-lambda';
import { bootstrap_serverless } from '../../nest/main';

let server: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap_serverless());
  return server(event, context, callback);
};