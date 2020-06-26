const mongoose = require("mongoose");
const schema = mongoose.Schema;

const itemSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    resid: { type: mongoose.Types.ObjectId, required: true, ref: "Restaurant" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Item", itemSchema);
