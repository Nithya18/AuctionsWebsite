/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable , UnauthorizedException} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authServe : AuthService) { 
    super({usernameField:'email'})
}
    async validate(email:string , password:string){        
        const user = await this.authServe.validateUser(email,password);
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}
