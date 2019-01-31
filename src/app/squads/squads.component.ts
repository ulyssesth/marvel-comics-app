import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Squads } from '../models/squads.model';
import { SQUADS } from '../mocks/squads-mock';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {

  private squads: Squads;
  private newSquadName;
  private idSquad;

  constructor(private router: Router) { }

  ngOnInit() {
    // Verifica se os esquadrões ja foram setados em localStorage, senão seta-os.
    if (window.localStorage.getItem('squads') === null) {
      let parseJson = JSON.stringify(SQUADS);
      window.localStorage.setItem('squads', parseJson);  
    }

    // Verifica se o index para criação de novos esquadrões ja foi setado em localStorage, senão seta-os.
    if (window.localStorage.getItem('idStart') === null) {
      window.localStorage.setItem('idStart', '7');  
    }

    this.squads = JSON.parse(window.localStorage.getItem('squads'));
    this.idSquad = JSON.parse(window.localStorage.getItem('idStart'));
  }

  /**
   * Envia novo squad para o array salvo em localStorage.
   */
  onSubmit() {
    let arrSquad = JSON.parse(window.localStorage.getItem('squads'));
    let newSquad: Squads = {
      id: this.idSquad.toString(),
      name: this.newSquadName,
      heroes: []
    };

    this.newSquadName = null;
    this.idSquad ++;

    window.localStorage.setItem('idStart', this.idSquad.toString());
    arrSquad.push(newSquad);
    let parseString = JSON.stringify(arrSquad);

    window.localStorage.setItem('squads', parseString);
    this.squads = JSON.parse(window.localStorage.getItem('squads'));
  }

  /**
   * Seleciona squad para adição de heroes.
   * @param index posição do objeto hero no array;
   */
  selectSquad(index: any) {
    window.localStorage.removeItem('indexSquad');
    window.localStorage.setItem('indexSquad', index.toString());
    this.router.navigate(['/edit-squad']);
  }
}
