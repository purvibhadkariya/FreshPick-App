import { Product, IProduct } from "../models/product.model";
import { isValidObjectId } from "mongoose";

// Create Product Service
export const createProductService = async (productData: IProduct) => {
  try {
    // Validate required fields
    const requiredFields = [
      "name",
      "price",
      "mrp",
      "images",
      "weight",
      "inStock",
      "isAvailable",
      "category",
    ];

    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate category ID
    if (!isValidObjectId(productData.category)) {
      throw new Error("Invalid category ID format");
    }

    // Creating a new product instance
    const newProduct = new Product(productData);

    // Saving product to the database
    const savedProduct = await newProduct.save();

    return savedProduct.toObject(); // Convert to plain object
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    throw new Error(error.message || "Failed to create product");
  }
};

// Get Product by ID or Get All Products
export const getProductByIDservice = async (id?: string) => {
  try {
    if (id) {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid product ID format");
      }
      const product = await Product.findById(id);
      return product || null; // Return null if product not found
    }
    return await Product.find(); // Return all products if no ID is provided
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};

// Update Product Service
export const updateProductService = async (
  id: string,
  updateData: Partial<IProduct>
) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid product ID format");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures updates follow schema validation
    });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error(error);
  }
};

// Delete Product Service
export const deleteService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid product ID format");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    return deletedProduct;
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error(error.message);
  }
};
