import { Component, OnInit } from '@angular/core';
import { SQUADS } from '../mocks/squads-mock';
import { Squads } from '../models/squads.model';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {

  private squads: Squads;

  private newSquad;

  constructor() { }

  ngOnInit() {

    if (window.localStorage.getItem('squads') === null) {
      let parseJson = JSON.stringify(SQUADS);
      window.localStorage.setItem('squads', parseJson);  
    }
    
    this.squads = JSON.parse(window.localStorage.getItem('squads'));
    console.log(this.squads);
    
  }

  onSubmit() {
    console.log(this.newSquad);
    
    
  }

}
