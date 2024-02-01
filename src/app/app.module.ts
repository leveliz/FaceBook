import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidetapleftComponent } from './sidetapleft/sidetapleft.component';
import { FeedsComponent } from './feeds/feeds.component';
import { StorysComponent } from './storys/storys.component';
import { PostComponent } from './post/post.component';
import { SidetaprightComponent } from './sidetapright/sidetapright.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidetapleftComponent,
    FeedsComponent,
    StorysComponent,
    PostComponent,
    SidetaprightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
