import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  // { path: 'posts/:id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
