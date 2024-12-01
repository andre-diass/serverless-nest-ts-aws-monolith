import { Devices } from '../../domain/devices/devices';

export interface DevicesWriteRepository {
  save(devices: Devices): Promise<void>;
  restore(user_id: string): Promise<any>;
}
