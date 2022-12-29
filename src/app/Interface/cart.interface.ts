import { User } from "../_model";
import { Product } from "./product.interface";

export interface Cart {
  id: number;
  quantity: number;
  userId:number;
  product:Product;
}