import amqplib from 'amqplib';

let connection;
let channel;

export async function initRabbit() {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost';
    connection = await amqplib.connect(url);
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Connected');
    return channel;
}

export async function publish(queue, message) {
    if (!channel) await initRabbit();
    await channel.assertQueue(queue, {
        durable: true
    });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true
    });
}

export default {
    initRabbit,
    publish