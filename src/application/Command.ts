import { RepositoriesFactory } from '../infra/factories/RepositoriesFactory';

export class Command {
  constructor(readonly repositories_factory: RepositoriesFactory) {}

  async get_user(auth_payload: any) {}
}
