import { z } from 'zod';
import { Command } from '../../Command';
import { UserNotFound } from '../../../errors/user';
import { User } from '../../../domain/user/User';

const input_schema = z.object({
  user_id: z.string().min(0),
  account_id: z.string().min(0),
});

type Input = z.infer<typeof input_schema>;
type Output = User | null;

export class SignIn extends Command {
  async execute(input: Input): Promise<Output> {
    const { user_id, account_id } = await input_schema.parseAsync(input);
    const { read } = this.repositories_factory.user_repository();
    const user = read.restore(user_id, account_id);
    if (user === null) {
      throw new UserNotFound();
    }
    return user;
  }
}
