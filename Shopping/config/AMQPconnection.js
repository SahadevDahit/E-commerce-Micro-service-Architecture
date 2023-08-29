import amqp from 'amqplib';

const url = process.env.messageBrokerUrl;

const connectionPromise = amqp.connect(url);

export const getConnection = async () => {
    return connectionPromise;
}

export const getChannel = async () => {
    const connection = await getConnection();
    const channel = await connection.createChannel();
    console.log("Message Broker connected")

    return channel;
}