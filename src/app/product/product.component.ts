import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { DialogBoxComponent } from '../product-dialog-box/dialog-box.component';
import { Product } from '../Interface/product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  constructor(private route: ActivatedRoute, private readonly http: HttpClient, private readonly categoryService:CategoryService,
    private readonly productService:ProductService,private productDialog: MatDialog) {
    
  }
  // private productDialog: MatDialog;
  product:Product[] = [];

  public id: string;
  dataSource: MatTableDataSource<Product>;


  getProducts():void{
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.categoryService.getProductsbyCatId(this.id);
    this.categoryService.product.subscribe({
      next: response => {
        // this.category = response.map()
        this.product = response;

        this.dataSource = new MatTableDataSource(response);
        console.log(response);
    }});

  }

  ngOnInit() {
      this.getProducts()
      }
      displayedColumns: string[] = ['id', 'name','description', 'price',  'action'];
  
      // products: Product[];

  // displayedColumns: string[] = ['id', 'imageUrl', 'name', 'price', 'quantity', 'category', 'action'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // constructor(private readonly ProductService: ProductService,
    // private productDialog: MatDialog,
  //   private readonly router: Router,
  //   private readonly route: ActivatedRoute) {}



//   getProducts(): void {
//     this.productService.getProduct().subscribe({
//       next: (response) => {
//         this.dataSource = new MatTableDataSource(response);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       },
//       error: (err: HttpErrorResponse) => {
//         alert(err.message);
//       }
//     });
    
//   }

//   // Material Table
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
  
//   // Dialog Box
  addProduct() {
    this.productDialog.open(DialogBoxComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        this.getProducts();
      }
    });
  }

  editProduct(row): void {
    this.productDialog.open(DialogBoxComponent, {
      width: '70%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val == 'update') {
        this.getProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe({
        next: () => {
          this.getProducts();
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      })
  }

//   goToItemDetails(data: Product): void {
//     this.router.navigate(['details', data.id], {state: {data}, relativeTo: this.route}).then();
//   }


}
