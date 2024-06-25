import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private httpClient: HttpClient){}

data:any

  getApiUrl()
  {  

  
  this.data=this.httpClient.get('https://jsonplaceholder.typicode.com/todos');
return this.data;

} 
}
