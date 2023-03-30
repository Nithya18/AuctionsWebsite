/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, UseGuards , Response} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Console } from 'console';
import { redisClient } from '../redis/session.store';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any , @Response() res:any) {    
  //  await this.authservice.setSession(String(req.sessionID) , req.user);
    req.session.otp = '123'
    return { msg: `hey  u are logged in now`};
    
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  async getHello(@Request() req: any )  { 
      
      return req.user;

  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async get(@Request() req: any )  { 
      const data = await this.authservice.get(req.sessionID);
      console.log(data)     
  
  }

  @Post('/logout')
  async logout(@Request() req:any , @Response() res:any){
    await this.authservice.delete(req.sessionID);
    res.send('done')
  }


  
}
