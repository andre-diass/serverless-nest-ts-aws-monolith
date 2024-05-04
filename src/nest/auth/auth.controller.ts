// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Post,
// } from '@nestjs/common';
// import { SignIn } from '../../application/usecases/user/signIn';
// import { RepositoriesFactory } from '../../infra/factories/RepositoriesFactory';
//
// @Controller('auth')
// export class AuthController {
//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   async sign_in(@Body() sign_in_body: any) {
//     const login = new SignIn(new RepositoriesFactory());
//     const result = await login.execute(sign_in_body);
//     return result;
//   }
// }
