import { Injectable } from '@angular/core';
import {BookResponse} from '../domain/book.response';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {BookRequest} from '../domain/book.request';
import {REST_URL} from './url.service';
@Injectable()

export class BookService{
name = localStorage.getItem("addedBy");
constructor(private http: Http) {}
getbookdetailsname(){
    
    return this.http.get(REST_URL + "/books/1/"+this.name).map((response: Response) =>{
    console.log (response.json());
    return <BookResponse[]>response.json()}
    
)


}

getbookdetails(){
    console.log(this.name);
    return this.http.get(REST_URL + "/books").map((response: Response) =>{
    console.log (response.json());
    return <BookResponse[]>response.json()}
    
)


}
savebook(BookRequest : BookRequest){
    return this.http.post(REST_URL + '/books',BookRequest).map((response: Response) =>{
    console.log (response.json());
    }
)


}
updatebookComment(BookRequest :BookRequest,id){
    return this.http.put(REST_URL + '/books/'+id,BookRequest).map((response: Response) =>{
        console.log (response.json());
        }
}



}