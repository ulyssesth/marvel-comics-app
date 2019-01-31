import { Component, OnInit } from '@angular/core';
 
import { ApiService } from '../services/api.service';
import { Hero } from '../models/heroes.model';
import { HeroesResponse } from '../models/heroes.response';
import { ComicsResponse } from '../models/comics.response';
import { SQUADS } from '../mocks/squads-mock';

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

constructor(private apiService: ApiService) { }

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
    
    this.pageHeroes(0, this.filterHero);
  }

  /**
   * Realiza a requisição dos heróis.
   * @param page Pagina selecionada.
   * @param filterHero Pesquisa de heroís por nome.
   */
  pageHeroes(page, filterHero) {
    if (filterHero) {
      this.apiService.getHeroesFiltering(page, filterHero).subscribe(res => {
        this.page = res.data;
        this.totalRecords = res.data.total;
        this.heroes = res.data.results;
      });
    } else {
      this.apiService.getHeroesPage(page, '').subscribe(res => {
        this.page = res.data;
        this.totalRecords = res.data.total;
        this.heroes = res.data.results;
      });
    }
  }

  /**
   * Recebe o filtro e verifica se não está em branco para realizar pesquisa de heróis.
   */
  filter() {
    if (this.filterHero.trim().length > 0) {
      this.pageHeroes(0, this.filterHero.trim());
    } else {
      this.pageHeroes(0, this.filterHero = null);
    }
  }

  /**
   * Realiza os eventos de paginação da tabela.
   * @param event Evento de paginação.
   */
  paginate(event) {
    this.pageHeroes(event.page, this.filterHero);
  }

  /**
   * Realiza a seleção do herói e apresenta seus detalhes.
   * @param event Evento de seleção.
   * @param hero Herói selecionado.
   */
  selectHero(event: Event, hero: Hero) {
    this.heroName = hero.name;  
    this.selectedHero = hero;
    this.displayDialog = true;
    this.pageComics(hero.id, 0);
  }
  
  /**
   * Atribui valores nulos após fechamento do dialog.
   */
  onDialogHide() {
    this.selectedHero = null;
    this.comics = null;
  }

  /**
   * Realiza a requisação dos quadrinhos que o herói selecionado tem vínculo.
   * @param idHero Id do heroi selecionado.
   * @param page Pagina selecionada.
   */
  pageComics(idHero, page) {
    this.apiService.getComicsPage(idHero, page).subscribe(res => {
      this.pageComic = res.data;
      this.totalComics = res.data.total;
      this.comics = res.data.results;
    });
  }

  /**
   * Realiza paginação dos quadrinhos do herói selecionado.
   * @param event Evento de paginação.
   */
  paginateComics(event) {
    this.pageComics(this.selectedHero.id, event.page);
  }
}
