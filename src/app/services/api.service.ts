import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HeroesResponse } from '../models/heroes.response';
import { ComicsResponse } from '../models/comics.response';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://gateway.marvel.com:443/v1/public/';
  private key = '?apikey=09fc8064325bbd026e5cb4237adf31c9';
  private limit = 10;
  private limitComics = 5;

  /**
   * Requisação de Lista de Heróis. 
   */
  getHeroesPage(page, filter): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${this.baseUrl}characters${this.key}&offset=${(page * this.limit)}&limit=${this.limit}`);
  }
  
  /**
   * Requisação de Lista de Heróis filtrados por nome. 
   */
  getHeroesFiltering(page, filter): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${this.baseUrl}characters${this.key}&offset=${(page * this.limit)}&limit=${this.limit}&nameStartsWith=${filter}`);
  }
  
  /**
   * Requisação de Lista de Quadrinhos. 
   */
  getComicsPage(idHero, page): Observable<ComicsResponse> {
    return this.http.get<ComicsResponse>(`${this.baseUrl}characters/${idHero}/comics${this.key}&offset=${(page * this.limitComics)}&limit=${this.limitComics}`);
  }

  /**
   * Requisação de filtro de Heróis. 
   */
  getHeroesList(filter): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${this.baseUrl}characters${this.key}&nameStartsWith=${filter}`);
  }
}
