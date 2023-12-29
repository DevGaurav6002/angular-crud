import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.baseUrl}/getAllUsers`)
  }

  createUser(userForm:any){
    return this.http.post(`${this.baseUrl}/createUser`, userForm)
  }

  deleteUser(id:any){
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`,)
  }

  getSingleUser(id:any){
    return this.http.get(`${this.baseUrl}/getUser/${id}`)
  }

  updateUser(recentEdits:any){
    return this.http.put(`${this.baseUrl}/updateUser/`, recentEdits)
  }

}
