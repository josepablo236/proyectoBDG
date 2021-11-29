import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {

  constructor(private http: HttpClient) { }
  getUser(user: string, pass: string){
    return true;
  }
  private ejecutarQuery<T>(){
    //return false;
  }
}
