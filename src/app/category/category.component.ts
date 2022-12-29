import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../Interface/category.interface';
import { CategoryService } from './category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDialogBoxComponent } from '../category-dialog-box/category-dialog-box.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  constructor(private readonly http: HttpClient, private readonly categoryService:CategoryService,
    private categoryDialog: MatDialog) {
  }
  dataSource: MatTableDataSource<Category>;

  category:Category[];
  public id: string;

  displayedColumns: string[] = ['id', 'name','description', 'action'];

  ngOnInit(): void {
    this.getCategory()
       
  }
  getCategory():void{
    this.categoryService.getCategories()
    this.categoryService.category.subscribe({
      next: response => {
        // this.category = response.map()
        this.category = response;
        console.log("res",response);
        this.dataSource = new MatTableDataSource(response);
      }
    });
  console.log(this.category);
  }

  addCategory() {
    this.categoryDialog.open(CategoryDialogBoxComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        this.getCategory();
      }
    }); 
  }

  editCategory(row): void {
    this.categoryDialog.open(CategoryDialogBoxComponent, {
      width: '70%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val == 'update') {
        this.getCategory();
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id)
      .subscribe({
        next: () => {
          this.getCategory();
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      })
  }
}
