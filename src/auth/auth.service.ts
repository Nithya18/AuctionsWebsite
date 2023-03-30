/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { redisClient } from '../redis/session.store';
import { comparePassword } from '../utility/password';

@Injectable()
export class AuthService {
    constructor( private UserService: UsersService){}

    async validateUser(email:string,userPassword:string){
        try {          
            const validUser = await this.UserService.findOne(email);
            const  password = await comparePassword(userPassword , validUser.password );
            if(validUser && password){
                const{ password ,...rest} = validUser;
                return rest;
            }             

        } catch (error) {
            throw error;
        }
    }

    async set(key:any , data:any){
        try{
            await redisClient.set(key,JSON.stringify(data)).then(()=>console.log("done"));

        }catch(e){
            throw e;
        }
    }
    async getsession(key: string) {
        await redisClient.get(key, (error,session) => {
            console.log(session)
            return session;
            
    });
      }

    async get(key:string){
        console.log(key)
       return  await redisClient.get(key)
    }

     async delete(key:string){
            return await redisClient.del(key , function(err, response) {
                if (response == 1) {
                   return "Deleted Successfully!"
                } else{
                 return "Cannot delete"
                }
             });
          
     } 

    //  async setSession (sid:string , session:any) {
    //     await redisClient.set(sid, JSON.stringify(session));
    //     return "done";
    //  }

    
}
