const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchema = new schema(
  {
    name: {
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
        required: true,
    },
      isVeg: {
          type: Boolean,
          required: true,
      },
    role: {
      type: Number,
      default: 0,
      required: true,
    },
    orders: [{ type: mongoose.Types.ObjectId, required: true, ref: "Orders" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
