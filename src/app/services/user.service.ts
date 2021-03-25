import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
const api_url= environment.api_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  refreshSolde = new Subject<void>()

  get __refreshSolde(){
    return this.refreshSolde
  }

  getUsers(){
    return this.http.get(api_url +`admin/users?isArchived=false`);
  }

  getProfil(){
    return this.http.get(api_url +`admin/profils`);
  }
  postUser(data){
    return this.http.post(api_url +`admin/users`,data)
      .pipe(
        tap(()=>{
          this.refreshSolde.next()
        })
      )
  }
  putUser(data:any,id:number){
    return this.http.post(api_url +`admin/users/${id}?_method=PUT`,data)
      .pipe(
        tap(()=>{
          this.refreshSolde.next()
        })
      )
  }

  delete(id:number){
    return this.http.delete(api_url +`admin/users/${id}`)
      .pipe(
        tap(()=>{
          this.refreshSolde.next()
        })
      )
  }

  getUserById(id:number){
    return this.http.get(api_url +`admin/users/${id}`);

  }
}
