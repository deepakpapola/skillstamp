import { environment } from './../../environments/environment';
import { CommonService } from './../shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emailverify',
  template: `
    
  `,
  styles: []
})
export class EmailverifyComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private service:CommonService,private router:Router) {
    let token = this.activatedRoute.snapshot.paramMap.get('token') 
    
    
      this.service.get(`${environment.url}/emailConfirmation/${token}`)
      .subscribe(data => {
        if(data['success'] == true) {
         
          localStorage.setItem('currentUser', JSON.stringify({ 
            user:data['user'],
            token: data['token']
          }));
    
          localStorage.setItem("certificates", JSON.stringify(data['certificates']));
    
          this.router.navigate(['dashboard']);
        } else {
          alert('email verifiation failed.');
        }
      })
   }

  ngOnInit() {
  }
}
