import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef,MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category/category.service';
import { Category } from '../Interface/category.interface';
import { Product } from '../Interface/product.interface';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  productForm: FormGroup;
  categories:Category[];
  actionBtn: string = "Save";
  actionLabel: string = "Add";
  constructor(private readonly formBuilder: FormBuilder,
    public dialog:MatDialog,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private productDialogRef: MatDialogRef<Product>,
    @Inject(MAT_DIALOG_DATA) public data: Product){
    // console.log("DB")
    // console.log(data)
  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      // 'quantity': ['', Validators.required],
      // 'imageUrl': [''],
      'description': ['', Validators.required],
      'category_id': ['', Validators.required],
    });
  this.productForm = this.formBuilder.group({
    'id': [''],
    'name': ['', Validators.required],
    'price': ['', Validators.required],
    // 'quantity': ['', Validators.required],
    // 'imageUrl': [''],
    'description': ['', Validators.required],
    'category': ['', Validators.required],
  });
  this.categoryService.getCategories()
  this.categoryService.category .subscribe({
    next:(response) =>{
      this.categories = response;
    },
    error: (err:HttpErrorResponse)=>{
      alert(err.message)
    }
  })
  if(this.data) {
    this.actionBtn = "Update";
    this.actionLabel = "Update";
    this.productForm.controls['id'].setValue(this.data.id);
    this.productForm.controls['name'].setValue(this.data.name);
    this.productForm.controls['price'].setValue(this.data.price);
    // this.productForm.controls['quantity'].setValue(this.data.quantity);
    this.productForm.controls['description'].setValue(this.data.description);
    // this.productForm.controls['imageUrl'].setValue(this.data.imageUrl);
    this.productForm.controls['category'].setValue(this.data.category.id);
  }
  }

  addProduct(): void {
    const product = this.productForm.value;
    const formData = new FormData();
    let id = product.category;
    product.category = this.categories.find(items=>items.id == id);
    console.log(JSON.stringify(product))
    
    // console.log(JSON.stringify(product))
    // console.log(product)
    // formData.append('product', JSON.stringify(product));
    // console.log(formData)
    // formData.append('file', this.productFile);
    if(!this.data){
      this.productService
        .addProduct(product)
        .subscribe({
          next: () => {
            this.productForm.reset();
            this.productDialogRef.close("save");
          },
        error: (err: HttpErrorResponse) => {
            alert(err.message);
          }
      })
    }
    else {
      this.updateProduct(product); 
    }
  }

  updateProduct(formData: FormData): void {
    this.productService
    .updateProduct(formData)
    .subscribe({
      next: () => {
        this.productForm.reset();
        this.productDialogRef.close("update");
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }
}
