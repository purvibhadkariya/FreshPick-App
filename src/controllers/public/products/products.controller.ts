import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response } from "express";
import resMiddlewareCommon from "../../../@utils/middlewares/resMiddleware";
import {
  createProductService,
  getProductByIDservice,
  updateProductService,
  deleteService,
} from "../../../services/product.service";

@Controller("public/products")
export class productController {
  @Post("create")
  async createProduct(req: Request, res: Response) {
    try {
      const requiredFields = ["name", "price", "mrp", "images", "weight", "inStock", "isAvailable", "category"];
      const missingFields = requiredFields.filter(field => !req.body[field] || (Array.isArray(req.body[field]) && req.body[field].length === 0));

      if (missingFields.length > 0) {
        return resMiddlewareCommon(res, false, `Missing required fields: ${missingFields.join(", ")}`);
      }

      const data = await createProductService(req.body);
      
      return resMiddlewareCommon(res, true, "Product created successfully", data);
    } catch (error: any) {
      console.error("Error in createProduct:", error.message);
      return resMiddlewareCommon(res, false, error.message || "Something went wrong. Please try again.");
    }
  }

@Get("")
  async getProducts(req: Request, res: Response) {
    try {
      const products = await getProductByIDservice();
      if (!products || products.length === 0) {
        return resMiddlewareCommon(res, false, "No products found.");
      }
      return resMiddlewareCommon(
        res,
        true,
        "Products fetched successfully",
        products
      );
    } catch (error: any) {
      console.error("Error in getProducts:", error);
      return resMiddlewareCommon(res, false, "Error fetching products.");
    }
  }

  @Get(":id")
  async getProductByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productById = await getProductByIDservice(id); // ✅ Pass `id` to the service
      if (!productById) {
        return resMiddlewareCommon(res, false, "Product not found.");
      }
      return resMiddlewareCommon(
        res,
        true,
        "Product fetched successfully",
        productById
      );
    } catch (error: any) {
      console.error("Error in getProductByID:", error);
      return resMiddlewareCommon(res, false, "Error fetching product.");
    }
  }

  @Put("update/:id")
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = await updateProductService(id, req.body);

      if (!updateData) {
        return resMiddlewareCommon(
          res,
          false,
          "Product not found or not updated."
        );
      }
      return resMiddlewareCommon(
        res,
        true,
        "Product updated successfully",
        updateData
      ); // ✅ Fixed message
    } catch (error: any) {
      console.error("Error in updateProduct:", error);
      return resMiddlewareCommon(
        res,
        false,
        "Something went wrong. Please try again."
      );
    }
  }

  @Delete("delete/:id")
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const delProduct = await deleteService(id);

      if (!delProduct) {
        return resMiddlewareCommon(
          res,
          false,
          "Product not found or not deleted."
        );
      }
      return resMiddlewareCommon(
        res,
        true,
        "Product deleted successfully",
        delProduct
      );
    } catch (error: any) {
      console.error("Error in deleteProduct:", error);
      return resMiddlewareCommon(
        res,
        false,
        "Something went wrong. Please try again."
      );
    }
  }
}
