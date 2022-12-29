import { Product } from "./product.interface";

export interface Category {
    id:Number,
    name:String,
    description:String,
    createdAt:any,
    updatedAt:any,
    products:Product[] 
  }

// const columnsToDisplay = ['name', 'description'];