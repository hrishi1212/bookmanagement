import { Component, OnInit } from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import { SelectItem } from 'primeng/components/common/selectitem';
import {BookService} from '../service/book.service';
import { HttpModule } from '@angular/http';
import {BookRequest} from '../domain/book.request';
import {BookResponse} from '../domain/book.response';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import { ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    encapsulation: ViewEncapsulation.None,
    providers:[BookService, HttpModule]
})

export class UserComponent implements OnInit{
    displayDialog: boolean;
    username:string;
    display: boolean = false;
    books: BookResponse[];
        BookRequest : BookRequest = new BookRequest();
        selectedBook: BookResponse;

        newBook: boolean;

        cols: any[];
    // tslint:disable-next-line:no-trailing-whitespace
    
        constructor(private _book: BookService) { }
    // tslint:disable-next-line:no-trailing-whitespace
    
        ngOnInit() {
            var  userName = localStorage.getItem("addedBy");
            if(!userName){
                this.display = true;
            }else{
                this.loadallBooks();
            }
            
            this.cols = [
                { field: 'vin', header: 'Vin' },
                { field: 'year', header: 'Year' },
                { field: 'brand', header: 'Brand' },
                { field: 'color', header: 'Color' }
            ];
        }
    
        showDialogToAdd() {
            this.newBook = true;
            this.BookRequest = new BookRequest();
            this.displayDialog = true;
        }
    
        save() {
            this.saveBook();
            this.displayDialog = false;
        }
    
        delete() {
            let index = this.books.indexOf(this.selectedBook);
            this.books = this.books.filter((val, i) => i != index);
            this.displayDialog = false;
        }
        saveBook(){
            //local storage to be add
              this.BookRequest.addedBy = localStorage.getItem("addedBy");
               
              this._book.savebook(this.BookRequest).subscribe(data => {this.loadallBooks();},Error => {console.log(Response)}
            
            
            )
          }
          loadallBooks(){
            this._book.getbookdetailsname().subscribe((books : any)=>{this.books =books;
    
            });
            
            //console.log('here'+this.products[0].name);
            this.books=this.books;
            
                
            }
            savetolocal(username){
                if(username){
                    localStorage.setItem("addedBy",username);
                    location.reload();
                }else{
                    this.display= false;
                }
            }
    }
    

