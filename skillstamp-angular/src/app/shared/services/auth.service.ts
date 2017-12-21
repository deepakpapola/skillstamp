import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  
  token: string;
  private userSource = new Subject<{}>();
  user$ = this.userSource.asObservable();
  constructor( private http: HttpClient, private router : Router ) { }
  
  setUser(user){
    this.userSource.next(user);
  }
  login(user,url) {
    return this.http.post(url,user)
      .map((res) => this.setToken(res));
  }
  
  logout(): any {
    this.token = 'token here';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('certificates');
    this.router.navigate(['/login']);
    // this.notify.info(`Logged out`,'see you soon')
  }

  Verify():Promise<any> { 
    let currUser = JSON.parse(localStorage.getItem('currentUser')); 
    //if(!currUser){ this.router.navigate(['login']) }
    let token = ( currUser && 'token' in currUser) ? currUser.token :'';
    let headers = new HttpHeaders().set('x-access-token', token ); 
    return this.http.get(`${environment.url}/check-state`,{headers: headers})
    .toPromise()
    .then(res => res )
  }

  setToken(body) { console.log('res  is',body)
    // let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        username:body['user']['username'],
        token: this.token 
      }));
      
    }
    return body;
  }
}
