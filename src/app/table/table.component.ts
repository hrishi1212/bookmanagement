import { Component, OnInit } from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import { SelectItem } from 'primeng/components/common/selectitem';
import {BookRequest} from '../domain/book.request';
import {BookResponse} from '../domain/book.response';
import {BookService} from '../service/book.service';
import { HttpModule } from '@angular/http';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    encapsulation: ViewEncapsulation.None,
    providers:[BookService,HttpModule]
})

export class TableComponent implements OnInit{
    display: boolean = false;
    books: BookResponse[];
    commentArray : any[];
    BookRequest : BookRequest = new BookRequest();
    username:string;
    selectedBook: BookRequest;
    
    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;
    comment:string;
    sortField: string;

    sortOrder: number;
   constructor(private _book: BookService) { }
    ngOnInit(){
        var  userName = localStorage.getItem("addedBy");
        if(!userName){
            this.display = true;
        }else{
            this.loadallBooks();
        }
        
        
    }
    selectBook(event: Event, book: BookRequest) {
        this.selectedBook = book;
        console.log(this.selectedBook.ISBN);
        
        this.displayDialog = true;
        event.preventDefault();
    }
updateBook(id){
    this.commentSave(id);
}
    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    
    onDialogHide() {
        this.selectedBook = null;
    }
    loadallBooks(){
        this._book.getbookdetails().subscribe((books : any)=>{this.books =books;
       
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
        commentSave(id){
           
            if(this.commentArray !== undefined){
                this.selectedBook.comments.push(this.commentArray);
            }else{
                this.selectedBook.comments;
            }
            
             this.BookRequest.addedBy = localStorage.getItem("addedBy");
             this.BookRequest.comments = this.selectedBook.comments;
             this.BookRequest.rating = this.selectedBook.rating;
            this._book.updatebookComment(this.BookRequest,id).
            subscribe(data => {this.loadallBooks();},Error => {console.log(Response)})
          
         }
       
}
