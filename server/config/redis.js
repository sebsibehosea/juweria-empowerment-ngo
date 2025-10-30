import {
    createClient
} from 'redis';

const url = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = createClient({
    url
});

redis.on('error', (err) => console.error('[Redis] Error', err));

export async function initRedis() {
    if (!redis.isOpen) {
        await redis.connect();
        console.log('[Redis] Connected');
    }
    return redis;
}