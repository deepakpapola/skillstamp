import { InteractionComponent } from './course-detail/interaction.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
      { path: 'courses/Big-Data-and-Analytics-Certification', component:CourseDetailComponent},
      {path: 'courses/Interaction-Designer-Certification', component:InteractionComponent}

    ])],
    exports: [RouterModule]
  })
  export class coursesRouting {}