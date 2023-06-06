import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
