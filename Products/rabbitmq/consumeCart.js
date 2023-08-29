import {
    getChannel
} from '../config/AMQPconnection.js'
import Cart from '../models/carts.js'
const channel = await getChannel();

const consume = async () => {
    try {
        const queueName = 'carts'
        await channel.assertQueue(queueName);
        channel.consume(queueName, async (message) => {
            const cartItem = JSON.parse(message.content.toString());
            //create
            await Cart.create(cartItem);
            channel.ack(message);
        });
    } catch (error) {
        console.error(error);
        throw new Error("Error in adding products to your carts")
    }
};
export default consume;