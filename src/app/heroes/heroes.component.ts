import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
 
import { ApiService } from '../services/api.service';
import { Hero } from '../models/heroes.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  
  datasource: Hero[];
  
  totalRecords: number;

  cols: any[];

  rows: any;
  
  loading: boolean;

constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.listHeroes();
  //   this.apiService.getHeroes().subscribe(res => {
  //     this.datasource = res.data.results;
      
  //     this.rows = this.datasource.length;
      
  //     this.totalRecords = res.data.total;
  // });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' }
    ];

    this.loading = true;
  }

  listHeroes() {
  //   this.apiService.getHeroes().subscribe(res => {
  //     this.heroes = res.data.results 
  //     console.log(res.data.results);
  //   });
    this.apiService.getHeroes().subscribe(res => {
      this.datasource = res.data.results;
      
      this.rows = this.datasource.length;
      
      this.totalRecords = res.data.total;
  });
  }

  loadHeroLazy(event: LazyLoadEvent) {
    this.loading = true;
      setTimeout(() => {
        if (this.datasource) {
          this.heroes = this.datasource.slice(event.first, (event.first + event.rows));
          this.loading = false;
        }
    }, 2000);
  }

}
