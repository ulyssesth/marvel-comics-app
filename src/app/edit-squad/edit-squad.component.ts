import { Component, OnInit } from '@angular/core';
import { Squads } from '../models/squads.model';
import { Hero } from '../models/heroes.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-squad',
  templateUrl: './edit-squad.component.html',
  styleUrls: ['./edit-squad.component.css']
})
export class EditSquadComponent implements OnInit {

  private squad: Squads;

  private hero: Hero;

  private heroes: Hero[];

  private filteredHeroes: Hero[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.squad = JSON.parse(window.localStorage.getItem('editSquad'));
    // console.log(this.squad);    
  }

  filterHero(event) {
    let query = event.query;
    // console.log(query);

    this.apiService.getHeroesList(query).subscribe(res => {
      // this.filteredHeroes = this.filterHero(query, this.heroes);
      this.filteredHeroes = res.data.results;
      console.log(this.filteredHeroes);
      
    });
  }

  // filterHero(query, heroes: Hero[]): any[] {
  //   let filtered : any[] = [];
  //       for(let i = 0; i < heroes.length; i++) {
  //           let hero = heroes[i];
  //           if(hero.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //               filtered.push(hero);
  //           }
  //       }
  //       return filtered;
  //   }
  

}
