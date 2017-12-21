import { environment } from './../../../environments/environment';
import { CommonService } from '../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styles: []
})
export class InteractionComponent implements OnInit {

  public messages:any;
  public newQuery:{}={};
  public baseUrl=environment.url;
  public errormsg:any;
  constructor(private service:CommonService) { }

  ngOnInit() {
    localStorage.setItem('courseName','Interaction Designer Certification');
  }
  askquery():any{
    this.newQuery['course'] = localStorage.getItem('courseName');
    this.service.post(`${this.baseUrl}/courses/query`,this.newQuery)
    .subscribe(data => {
      if(data['success'] == true) {
        this.messages ='Thanks for submitting your query.we will responde you soon'
      
      } else {
        this.errormsg=data['message'];
      }
    })
  }

}
