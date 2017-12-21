import { CommonService } from './../shared/services/common.service';
import { AuthService } from './../shared/services/auth.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName='dee'
  public cUser:any={};
  public baseUrl = environment.url;
  public certificates:{};
  public courseName:any;
  public intersted:boolean=false;
  hideme=[]
  constructor(private service:AuthService,private commonServ:CommonService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser')); 
    this.cUser = user['user'];
    // console.log('C USER',this.cUser);

    let array = JSON.parse(localStorage.getItem('certificates'));
    this.certificates = array[0]['cirtificate'];
    this.courseName = array[0]['courseName']
     console.log('certificates is==',this.certificates)
  }
  logout(){
    alert('logged out');
    this.service.logout()
  }
  interst(){
    this.intersted = true;
  }

  saveEditable(value) { 
    // console.log('editr update ' + value);
    this.commonServ.put(`${this.baseUrl}/dashboard/editUser/${this.cUser._id}`,this.cUser)
    .subscribe(data => {
      if(data['success'] == true) {
        localStorage.setItem('currentUser', JSON.stringify({ 
          user:data['user']
        }));
        // alert('updated');
      } else {
        alert('try again');
      }
    })
  }
  
}
