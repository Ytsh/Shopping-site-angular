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
  selector: 'app-category-dialog-box',
  templateUrl: './category-dialog-box.component.html',
  styleUrls: ['./category-dialog-box.component.scss']
})
export class CategoryDialogBoxComponent {

  categoryForm: FormGroup;
  categories:Category[];
  actionBtn: string = "Save";
  actionLabel: string = "Add";
  constructor(private readonly formBuilder: FormBuilder,
    public dialog:MatDialog,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private categoryDialogRef: MatDialogRef<Category>,
    @Inject(MAT_DIALOG_DATA) public data: Category){
    // console.log("DB")
    // console.log(data)
  }
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.required],
      // 'price': ['', Validators.required],
      // 'quantity': ['', Validators.required],
      // 'imageUrl': [''],
      'description': ['', Validators.required],
      // 'category_id': ['', Validators.required],
    });
  this.categoryForm = this.formBuilder.group({
    'id': [''],
    'name': ['', Validators.required],
    // 'price': ['', Validators.required],
    // 'quantity': ['', Validators.required],
    // 'imageUrl': [''],
    'description': ['', Validators.required],
    // 'category': ['', Validators.required],
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
    this.categoryForm.controls['id'].setValue(this.data.id);
    this.categoryForm.controls['name'].setValue(this.data.name);
    // this.categoryForm.controls['price'].setValue(this.data.price);
    // this.categoryForm.controls['quantity'].setValue(this.data.quantity);
    this.categoryForm.controls['description'].setValue(this.data.description);
    // this.categoryForm.controls['imageUrl'].setValue(this.data.imageUrl);
    // this.categoryForm.controls['category'].setValue(this.data.category.id);
  }
  }

  addCategory(): void {
    const category = this.categoryForm.value;
    const formData = new FormData();
    
    // console.log(JSON.stringify(product))
    // console.log(product)
    // formData.append('product', JSON.stringify(product));
    // console.log(formData)
    // formData.append('file', this.productFile);
    if(!this.data){
      this.categoryService
        .addCategory(category)
        .subscribe({
          next: () => {
            this.categoryForm.reset();
            this.categoryDialogRef.close("save");
          },
        error: (err: HttpErrorResponse) => {
            alert(err.message);
          }
      })
    }
    else {
      this.updateCategory(category); 
    }
  }

  updateCategory(formData: FormData): void {
    this.categoryService
    .updateCategory(formData)
    .subscribe({
      next: () => {
        this.categoryForm.reset();
        this.categoryDialogRef.close("update");
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

}
