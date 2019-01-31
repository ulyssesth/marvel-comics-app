import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { Squads } from '../models/squads.model';
import { Hero } from '../models/heroes.model';

@Component({
  selector: 'app-edit-squad',
  templateUrl: './edit-squad.component.html',
  styleUrls: ['./edit-squad.component.css']
})
export class EditSquadComponent implements OnInit {

  private squads: Squads[];
  private index;
  private squad: Squads;
  private hero: Hero;
  private heroes: Hero[];
  private filteredHeroes: Hero[];

  constructor(private apiService: ApiService, private router: Router) {
    this.index = JSON.parse(window.localStorage.getItem('indexSquad'));
    if (this.index === null) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit() {
    window.localStorage.removeItem('indexSquad');
    this.squads = JSON.parse(window.localStorage.getItem('squads'));
    this.squad = this.squads[this.index];
    this.heroes = this.squad.heroes;
  }

  /**
   * Realiza a requisição a partir do filtro digitado;
   * @param event Recebe o paramêtro de pesquisa.
   */
  filterHero(event) {
    let query = event.query;
    if (query.trim().length > 0) {
      this.apiService.getHeroesList(query.trim()).subscribe(res => {
        this.filteredHeroes = res.data.results;
      });
    }
  }

  /**
   * Realiza a seleção do herói e o insere no esquadrão.
   * @param event Recebe
   */
  selectHero(event) {
    let heroSel: Hero = {
      id: event.id,
      name: event.name
    }
    this.hero = null; // Limpa input após seleção do herói.
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
    this.squads[this.index] = this.squad;

    let parseString = JSON.stringify(this.squads);
    window.localStorage.setItem('squads', parseString);
  }
}
