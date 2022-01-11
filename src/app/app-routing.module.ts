import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListMembresComponent} from './components/list-membres/list-membres.component';
import {MembreEditComponent} from './components/membre-edit/membre-edit.component';
import {MembreAddComponent} from './components/membre-add/membre-add.component';
import {TheMembersComponent} from './components/the-members/the-members.component';
import {CotisationComponent} from './components/cotisation/cotisation.component';
import {CotisationByMembreComponent} from './components/cotisation-by-membre/cotisation-by-membre.component';
import {MembreDetailsComponent} from './components/membre-details/membre-details.component';
import {CotisationAddComponent} from './components/cotisation-add/cotisation-add.component';

const routes: Routes = [
  {path: 'cotisationAdd/:id', component: CotisationAddComponent},
  {path: 'membreDetails/:id', component: MembreDetailsComponent},
  {path: 'cotisationByMbre/:id', component: CotisationByMembreComponent},
  {path: 'cotisations', component: CotisationComponent},
  {path: 'theMembers', component: TheMembersComponent},
  {path: 'listMembres', component: ListMembresComponent},
  {path: 'editMembre/:id', component: MembreEditComponent},
  {path: 'addMembre',component: MembreAddComponent},
  {path:'', redirectTo:'theMembers', pathMatch:'full'}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
