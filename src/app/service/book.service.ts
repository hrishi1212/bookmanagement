import { Injectable } from '@angular/core';
import {BookResponse} from '../domain/book.response';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {BookRequest} from '../domain/book.request';
import {REST_URL} from './url.service';
@Injectable()

export class BookService{

constructor(private http: Http) {}
getbookdetails(){
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

}