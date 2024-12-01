import { DevicesWriteRepo } from '../repositories/DevicesRepositoryDB';
import { LocationsWriteRepo } from '../repositories/LocationsRepositoryDB';
import { UserReadRepo } from '../repositories/UserRepositoryDB';

export class RepositoriesFactory {
  user_repository() {
    return { read: new UserReadRepo() };
  }

  locations_repository() {
    return {
      write: new LocationsWriteRepo(),
    };
  }

  devices_repository() {
    return {
      write: new DevicesWriteRepo(),
    };
  }
}
