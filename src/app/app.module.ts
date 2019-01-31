import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SquadsComponent } from './squads/squads.component';
import { EditSquadComponent } from './edit-squad/edit-squad.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroesComponent,
    SquadsComponent,
    EditSquadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    InputTextModule,
    CardModule,
    AutoCompleteModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
