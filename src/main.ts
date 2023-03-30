/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { redisClient } from './redis/session.store';
import connectRedis  from 'connect-redis';
let RedisStore = require("connect-redis")(session)


// const RedisStore = connectRedis(session);
const {SESSION_SECRET} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); 
  
  app.use(session({
    store: new RedisStore({ client: redisClient }),
      
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
     cookie: {      
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie 
        maxAge: 600000 // session max age in miliseconds
     }
}))

  const config = new DocumentBuilder()
  .setTitle('Auction website')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.use(passport.initialize())
app.use(passport.session())

await app.listen(3000);

}
bootstrap();

