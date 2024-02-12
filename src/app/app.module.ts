import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidetapleftComponent } from './components/sidetapleft/sidetapleft.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { StorysComponent } from './components/storys/storys.component';
import { PostComponent } from './components/post/post.component';
import { SidetaprightComponent } from './components/sidetapright/sidetapright.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidetapleftComponent,
    FeedsComponent,
    StorysComponent,
    PostComponent,
    SidetaprightComponent,
    PostDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PostsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
