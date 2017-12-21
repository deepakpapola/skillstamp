import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { coursesRouting } from './courses.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses.component';
import { InteractionComponent } from './course-detail/interaction.component';

@NgModule({
  imports: [
    CommonModule,
    coursesRouting,
    FormsModule,
    SharedModule
  ],
  providers:[
    HttpClientModule
  ],
  declarations: [ CourseDetailComponent, CoursesComponent, InteractionComponent]
})
export class CoursesModule { }
