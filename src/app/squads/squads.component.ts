import { Component, OnInit } from '@angular/core';
import { SQUADS } from '../mocks/squads-mock';
import { Squads } from '../models/squads.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {

  private squads: Squads;

  private newSquadName;

  private idSquad: number = 7;

  constructor(private router: Router) { }

  ngOnInit() {

    // console.log(window.localStorage.getItem('squads'));
    if (window.localStorage.getItem('squads') === null) {
      let parseJson = JSON.stringify(SQUADS);
      window.localStorage.setItem('squads', parseJson);  
    }
    
    this.squads = JSON.parse(window.localStorage.getItem('squads'));
    // console.log(this.squads);
    
  }

  onSubmit() {
    // console.log(this.newSquadName);

    let arrSquad = JSON.parse(window.localStorage.getItem('squads'));
    // console.log(arrSquad);

    let newSquad: Squads = {
      id: this.idSquad.toString(),
      name: this.newSquadName,
      heroes: []
    };

    this.idSquad ++;

    arrSquad.push(newSquad);
    let parseString = JSON.stringify(arrSquad);
    window.localStorage.setItem('squads', parseString);
    // console.log(window.localStorage.getItem('squads'));
    
    this.squads = JSON.parse(window.localStorage.getItem('squads'));
    
    // console.log(newSquad);
    // console.log(this.idSquad);
    
    
    // newSquad.id = this.idSquad;
    // newSquad.name = this.newSquadName;
    // newSquad.heroes = [];  
    
  }

  selectSquad(index: any) {
  // selectSquad(squad: Squads, index: any) {

    // console.log(squad);
    
    window.localStorage.removeItem('indexSquad');
    // let sendSquad = JSON.stringify(index);
    window.localStorage.setItem('indexSquad', index.toString());

    this.router.navigate(['/edit-squad']);
  }

  // selectSquad(squad: Squads) {
  // // selectSquad(squad: Squads, index: any) {

  //   // console.log(squad);
    
  //   window.localStorage.removeItem('editSquad');
  //   let sendSquad = JSON.stringify(squad);
  //   window.localStorage.setItem('editSquad', sendSquad);

  //   this.router.navigate(['/edit-squad']);
  // }

}
