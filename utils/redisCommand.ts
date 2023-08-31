import { createClient } from 'redis';
import { promisify } from 'util';

export class RedisCommand {
  static client() {
    return createClient({
      legacyMode: true,
      url: process.env.REDIS_URL,
    });
  }

  static async get(key) {
    const client = this.client();
    client.connect().catch(console.error);
    const getAsync = promisify(client.get).bind(client);

    return getAsync(key);
  }

  static async set(key, value, expiration) {
    const client = this.client();
    client.connect().catch(console.error);

    await client.set(key, value, 'EX', expiration);
  }

  static async del(key) {
    const client = this.client();
    client.connect().catch(console.error);

    await client.del(key);
  }
}
