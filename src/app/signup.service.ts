import { Injectable } from '@angular/core';
import { User } from './user';
import { Employee } from './employee';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor( private _http:HttpClient) { }


  public loginUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>('http://localhost:8060/login',user);
  }
  public signupUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>('http://localhost:8060/signup',user);
  }
  public fetchEmployeeFromRemote():Observable<any>{
    return this._http.get<any>('http://localhost:8060/getemployeelist');
  }
  public addEmployeeFromRemote(employee: Employee):Observable<any>{
    return this._http.post<any>('http://localhost:8060/add',employee);
  }
  public fetchEmployeeByIdFromRemote(id:number):Observable<any>{
    return this._http.get<any>('http://localhost:8060/update/'+id);
  }
  public deleteEmployeeByIdFromRemote(id:number):Observable<any>{
    return this._http.delete<Text>('http://localhost:8060/delete/'+id);
  }
}
