import { Redis } from "ioredis";
import redis from 'redis';

export const redisClient = new Redis({
    host: 'localhost',
    port: 32769,
    password: 'redispw',
    connectTimeout : 100000
});

// const client = redis.createClient({
//     host: 'localhost',
//     port: 6379
//   });

// export const client = redis.createClient({
//     socket: {
//         host: 'localhost',
//         port: 6379
//     },
//     password: 'redispw'
// });