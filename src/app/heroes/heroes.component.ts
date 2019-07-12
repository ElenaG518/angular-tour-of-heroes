import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroService.getHeroes() receives an Observable<Hero[]>
    // then we call subscribe on it as in Observable.subscribe()
    // The new version waits for the Observable to emit the array of heroes— which
    //  could happen now or several minutes from now. Then subscribe passes
    // the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
}
