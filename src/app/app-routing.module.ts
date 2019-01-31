import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SquadsComponent } from './squads/squads.component';
import { EditSquadComponent } from './edit-squad/edit-squad.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'squads', component: SquadsComponent },
  { path: 'edit-squad', component: EditSquadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
