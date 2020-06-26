const mongoose = require("mongoose");
const schema = mongoose.Schema;

const restaurantSchema = new schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
      description: {
          type: String,
          required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    role: {
      type: Number,
      default: 1,
      required: true,
    },
    item: [{ type: mongoose.Types.ObjectId, required: true, ref: "Item" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Orders" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
