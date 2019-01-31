import { Component, OnInit } from '@angular/core';
import { Squads } from '../models/squads.model';
import { Hero } from '../models/heroes.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-squad',
  templateUrl: './edit-squad.component.html',
  styleUrls: ['./edit-squad.component.css']
})
export class EditSquadComponent implements OnInit {

  private squads: Squads[];

  private index;

  private squad: Squads;

  // private hero: Hero;

  private heroes: Hero[];

  private filteredHeroes: Hero[];

  constructor(private apiService: ApiService, private router: Router) {
    this.index = JSON.parse(window.localStorage.getItem('indexSquad'));
    if (this.index === null) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit() {
    // this.index = JSON.parse(window.localStorage.getItem('indexSquad'));
    // if (this.index === null) {
    //   this.router.navigate(['/home']);
    // } else {
    window.localStorage.removeItem('indexSquad');
    // console.log(this.index);    
    
    this.squads = JSON.parse(window.localStorage.getItem('squads'));

    this.squad = this.squads[this.index];
    // console.log(this.squads[this.index]);    
    // console.log(this.squad);    

    this.heroes = this.squad.heroes;
    // console.log(this.heroes);
    // } 
  }

  filterHero(event) {
    let query = event.query;
    console.log(query);

    if (query.trim().length > 0) {
      this.apiService.getHeroesList(query.trim()).subscribe(res => {
        this.filteredHeroes = res.data.results;
      });
    }
  }

  selectHero(event) {
    let heroSel: Hero = {
      id: event.id,
      name: event.name
    }

    if (this.squad.heroes.length < 5) {
      let flag: boolean = false;
      this.squad.heroes.forEach(element => {
        if (element.id === heroSel.id) {
          flag = true;
        }
      });
      if (!flag) {
        this.squad.heroes.push(heroSel);  
      }
    }

    // console.log(this.squad.heroes.indexOf(heroSel));
    console.log(this.squad);  
    // console.log(this.squad.heroes);  
    // console.log(this.squad.heroes.length);  
    
    this.squads[this.index] = this.squad;

    let parseString = JSON.stringify(this.squads);
    window.localStorage.setItem('squads', parseString);

    console.log(window.localStorage.getItem('squads'));
    
    
  }

}
