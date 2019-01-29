import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HeroesResponse } from '../models/heroes.response';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://gateway.marvel.com:443/v1/public/';
  key = '?apikey=09fc8064325bbd026e5cb4237adf31c9';

  limit = 10;

  getHeroes(): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(this.baseUrl + 'characters' + this.key + '&limit=' + this.limit);
  }
}
