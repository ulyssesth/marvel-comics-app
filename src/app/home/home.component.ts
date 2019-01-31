import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQUADS } from '../mocks/squads-mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lsSquads: any;

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('squads') === null) {
      let parseJson = JSON.stringify(SQUADS);
      window.localStorage.setItem('squads', parseJson);  
    }

    if (window.localStorage.getItem('idStart') === null) {
      window.localStorage.setItem('idStart', '7');  
    }
  }

  navToHeroes() {
    this.router.navigate(['/heroes']);  
  }

  navToSquads() {
    this.router.navigate(['/squads']);  
  }

}
