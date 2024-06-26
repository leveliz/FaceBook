import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidetapleftComponent } from './sidetapleft/sidetapleft.component';
import { FeedsComponent } from './feeds/feeds.component';
import { StorysComponent } from './storys/storys.component';
import { PostComponent } from './post/post.component';
import { SidetaprightComponent } from './sidetapright/sidetapright.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    PostsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
