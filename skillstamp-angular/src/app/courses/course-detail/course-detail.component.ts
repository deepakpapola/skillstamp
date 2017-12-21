import { environment } from './../../../environments/environment';
import { CommonService } from '../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  public messages:any;
  public errormsg:any;
  public newQuery:{}={};
  public baseUrl = environment.url;
  constructor(private service:CommonService) { }

  ngOnInit() {
    localStorage.setItem('courseName','Big Data and Analytics Certification');
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
