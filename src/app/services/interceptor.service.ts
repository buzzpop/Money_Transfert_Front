import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor{


  constructor(private injector: Injector, private storage: Storage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthenticationService);
    return from(this.storage.get('auth_token')).pipe(
      switchMap(token=>{
        if (token){
          req = req.clone({
            headers: req.headers.set('Authorization',`Bearer ${token}`)
          });
        }
        return next.handle(req).pipe(
          catchError(err => {
            if ([401,403].indexOf(err.status)!== -1){
              if (err.status== 401){
                authService.logOut();
              }
            }
            return throwError(err)
          })
        );
      })
    )
  }
}




