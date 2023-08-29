import {
    getChannel
} from '../config/AMQPconnection.js'
const channel = await getChannel();
const sendToQueue = async (objectData, queueName) => {
    try {
        const message = Buffer.from(JSON.stringify(objectData));
        channel.sendToQueue(queueName, message);
    } catch (error) {
        console.error(error);
    }
};
export default sendToQueue;