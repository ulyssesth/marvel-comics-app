import { Hero } from './heroes.model';

export interface Squads {
  id: number;
  name: string;
  heroes: Array<Hero>;
}