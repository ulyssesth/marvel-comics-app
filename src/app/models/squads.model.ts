import { Hero } from './heroes.model';

export interface Squads {
  id: string;
  name: string;
  heroes: Array<Hero>;
}