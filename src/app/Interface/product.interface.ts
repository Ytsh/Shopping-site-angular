import { Category } from "./category.interface"

export interface Product {
    id:Number,
    name:String,
    description:String,
    price:Float32Array
    createdAt:any,
    updatedAt:any,
    category:Category,
  }