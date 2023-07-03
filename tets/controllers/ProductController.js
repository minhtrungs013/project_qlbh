import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

// Get a User
export const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const productId = await ProductModel.findById(id);
        if (productId) {
            res.status(200).json(productId);
        } else {
            res.status(404).json("No such Product");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get all users
export const getAllProduct = async (req, res) => {

    try {
        let allProduct = await ProductModel.find();
        res.status(200).json(allProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const createProduct = async (req, res) => {
    console.log("aaa");
    const userId = req.params.id;
    const { nameProduct,
        description,
        price,
        image1,
        image2,
        image3,
        quantity,
        active
    } = req.body;

    if (nameProduct == null ||
        description == null ||
        price == null ||
        image1 == null ||
        image2 == null ||
        image3 == null ||
        quantity == null) {
        return res.status(400).json("You need to fill in the product information");
    }
    const user = await UserModel.findById(userId);
    if (user.isAdmin === true) {
        try {
            console.log("jajajaj");
            // have to change this
            const newProduct = new ProductModel(req.body);
            const product = await newProduct.save();
            res.status(200).json(product);

        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json("Access Denied!");
    }
};


// udpate a user

export const updateProductById = async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { nameProduct,
        description,
        price,
        image1,
        image2,
        image3,
        quantity,
        active
    } = req.body;

    if (nameProduct == null ||
        description == null ||
        price == null ||
        image1 == null ||
        image2 == null ||
        image3 == null ||
        quantity == null ||
        active == null) {
        res.status(400).json("You need to fill in the product information");
    }

    try {
        // have to change this
        const product = await ProductModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a user
export const deleteProductById = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    const product = await ProductModel.findById(id);
    if (product === undefined) {
        res.status(200).json("Product does not exist!");
    }
    const user = await UserModel.findById(userId);
    if (user.isAdmin === true) {
        try {
            await ProductModel.findByIdAndDelete(id);
            res.status(200).json("Product Deleted Successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Access Denied!");
    }
};

