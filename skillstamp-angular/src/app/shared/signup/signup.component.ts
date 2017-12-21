import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  public newEnrol:{}={};
  public course:any;
  public baseUrl = environment.url;
  public messages:any;
  public errormsg:any;
  constructor(private service:CommonService,private router:Router) { }

  ngOnInit() {
    this.course = localStorage.getItem('courseName');
    
  }

  enrolnow():any  {this.errormsg = 'Loading...'
    this.newEnrol['course'] = this.course;console.log('crs',this.newEnrol)
    this.service.post(`${this.baseUrl}/signup`,this.newEnrol)
    .subscribe(data => {
      if(data['success'] == true) {
       this.messages = data['message'];
      } else {
       this.errormsg = data['message'];
      }
    })


  }

}
