import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public loguser:{}={};
  public baseUrl = environment.url;
  public token: string;
  constructor(private service:CommonService, private router:Router) { }

  ngOnInit() {
  }
  loginuser():any {
    this.service.post(`${this.baseUrl}/login`,this.loguser)
    .subscribe(data => {
      if(data['success'] == true) {

        this.token = data['token'];
        localStorage.setItem('currentUser', JSON.stringify({ 
          user:data['user'],
          token: this.token
        }));

        localStorage.setItem("certificates", JSON.stringify(data['certificates']));

        // this.currentUser =data['user']; console.log('user logged in',this.currentUser);
        alert(data['message']);
        this.router.navigate(['dashboard']);
      } else {
        alert(data['message']);
      }
    })
  }
}
