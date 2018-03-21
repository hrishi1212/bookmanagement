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

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    providers:[BookService,HttpModule]
})

export class TableComponent implements OnInit{
    display: boolean = false;
    books: BookResponse[];
    username:string;
    selectedCar: BookResponse;
    
    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;
   constructor(private _book: BookService) { }
    ngOnInit(){
        // this.books = [
        //     { ISBN: 1, bookName: 'Vin',addedBy:'2018',rating:4 },
        //     { ISBN: 2, bookName: 'Vin',addedBy:'2018',rating:3 },
        //     {   ISBN: 3, bookName: 'Vin',addedBy:'2018',rating:2  },
        //     {  ISBN: 4, bookName: 'Vin',addedBy:'2018',rating:5 }
        // ];
        // this.sortOptions = [
        //     {label: 'Newest First', value: '!year'},
        //     {label: 'Oldest First', value: 'year'},
        //     {label: 'Brand', value: 'brand'}
        // ];
        var  userName = localStorage.getItem("addedBy");
        if(!userName){
            this.display = true;
        }else{
            this.loadallBooks();
        }
        
        
    }
    selectCar(event: Event, car: BookResponse) {
        this.selectedCar = car;
        this.displayDialog = true;
        event.preventDefault();
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
        this.selectedCar = null;
    }
    loadallBooks(){
        this._book.getbookdetails().subscribe((books : any)=>{this.books =books;
        console.log(this.books);
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
