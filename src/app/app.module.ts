import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ListMembresComponent } from './components/list-membres/list-membres.component';
import { CotisationComponent } from './components/cotisation/cotisation.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MembreEditComponent } from './components/membre-edit/membre-edit.component';
import { MembreAddComponent } from './components/membre-add/membre-add.component';
import { TheMembersComponent } from './components/the-members/the-members.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CotisationByMembreComponent } from './components/cotisation-by-membre/cotisation-by-membre.component';
import { MembreDetailsComponent } from './components/membre-details/membre-details.component';
import { CotisationAddComponent } from './components/cotisation-add/cotisation-add.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ActuComponent } from './components/actu/actu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMembresComponent,
    CotisationComponent,
    MenuBarComponent,
    MembreEditComponent,
    MembreAddComponent,
    TheMembersComponent,
    CotisationByMembreComponent,
    MembreDetailsComponent,
    CotisationAddComponent,
    FooterBarComponent,
    HomeComponent,
    AboutUsComponent,
    ActuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
