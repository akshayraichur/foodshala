const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema(
    {
        customerId: {type: mongoose.Types.ObjectId, ref: 'customers', required: true},
        customerName: {type: String, required: true},
        customerEmail: {type: String, required: true},
        restaurantId: {type: mongoose.Types.ObjectId, ref: 'restaurants', required: true},
        restaurantName: {type: String, required: true},
        restaurantEmail: {type: String, required: true},
        itemId: {type: mongoose.Types.ObjectId, ref: 'items', required: true},
        itemName: {type: String, required: true},
        itemPrice: {type: String, required: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
