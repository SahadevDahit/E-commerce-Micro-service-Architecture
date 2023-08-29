import {
    getChannel
} from '../config/AMQPconnection.js'
import Order from '../models/orders.js'
import Coupon from "../models/coupons.js"

const channel = await getChannel();

const consume = async () => {
    try {
        const queueName = 'order'
        await channel.assertQueue(queueName);
        channel.consume(queueName, async (message) => {
            const orderItem = JSON.parse(message.content.toString());

            //create
            const {
                productId,
                sellerId,
                coupon,
                price,
                orderedBy,
                quantityOrdered
            } = orderItem;
            let totalPrice = quantityOrdered * price;
            let discount = 0;

            let order = {
                orderedBy,
                productId,
                sellerId,
                quantityOrdered,
                discount,
                totalPrice,
            }
            if (coupon !== "" || coupon) {
                const Coupons = await Coupon.findOne({
                    code: coupon.toUpperCase()
                });
                if (Coupons) {
                    discount = totalPrice * (Coupons.discount * 0.1)
                    order.discount = discount
                    order.coupon = Coupons?.id
                }
            }
            await Order.create(order);
            channel.ack(message);
        });
    } catch (error) {
        console.error(error);
    }
};
export default consume;