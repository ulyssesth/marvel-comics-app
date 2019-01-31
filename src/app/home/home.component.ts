import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SQUADS } from '../mocks/squads-mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  }

  /**
   * Realiza a navegação para página "Heroes".
   */
  navToHeroes() {
    this.router.navigate(['/heroes']);  
  }

  /**
   * Realiza a navegação para página "Squads".
   */
  navToSquads() {
    this.router.navigate(['/squads']);  
  }

}
