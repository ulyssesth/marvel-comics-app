import { Component, OnInit } from '@angular/core';
 
import { ApiService } from '../services/api.service';
import { Hero } from '../models/heroes.model';
import { HeroesResponse } from '../models/heroes.response';
import { ComicsResponse } from '../models/comics.response';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  private heroes: Array<Hero> = [];
  
  private page: HeroesResponse;
  
  private totalRecords = 0;

  private filterHero = '';

  private selectedHero: Hero;
  
  private displayDialog = false;
  
  private heroName = '';
  


  private comics: Array<any> = [];
  
  private pageComic: ComicsResponse;
  
  private totalComics = 0;
  
  // private cols: any[];





constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.pageHeroes(0, this.filterHero);

    // this.cols = [
    //   { field: 'name', header: 'Name' },
    //   { field: 'description', header: 'Description' },
    // ];
  }

  pageHeroes(page, filterHero) {
    if (filterHero) {
      this.apiService.getHeroesFiltering(page, filterHero).subscribe(res => {
      this.page = res.data;
      // console.log(res);
      // console.log(this.page);

      this.totalRecords = res.data.total;
      // console.log(this.totalRecords);
      
      
      this.heroes = res.data.results;
      // console.log(this.heroes);
    });
      
    } else {
      this.apiService.getHeroesPage(page, '').subscribe(res => {
      this.page = res.data;
      // console.log(res);
      // console.log(this.page);

      this.totalRecords = res.data.total;
      // console.log(this.totalRecords);
      
      
      this.heroes = res.data.results;
      // console.log(this.heroes);
    });
  }
}

  filter() {
    if (this.filterHero.trim().length > 0) {
      this.pageHeroes(0, this.filterHero.trim());
    }
  }

  paginate(event) {
    this.pageHeroes(event.page, this.filterHero);
  }

  selectHero(event: Event, hero: Hero, name: any) {
    // console.log(hero); 
    this.heroName = name;  
    this.selectedHero = hero;
    this.displayDialog = true;
    event.preventDefault();

    this.pageComics(hero.id, 0);
  }
  
  onDialogHide() {
    this.selectedHero = null;
  }

  pageComics(idHero, page) {
    // console.log(idHero);
    
    this.apiService.getComicsPage(idHero, page).subscribe(res => {
      this.pageComic = res.data;
      // console.log(this.pageComic);

      this.totalComics = res.data.total;
      // console.log(this.totalComics);
      
      
      this.comics = res.data.results;
      // console.log(this.comics);
    });
  }

  paginateComics(event) {
    this.pageComics(this.selectedHero.id, event.page);
    // console.log(event.page);
    
  }
}
