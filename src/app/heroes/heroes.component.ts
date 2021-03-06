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

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // HeroService.getHeroes() will return an Observable because it will eventually use
    // the Angular HttpClient.get method to fetch the heroes and HttpClient.get()
    // returns an Observable.

    // this.heroService.getHeroes() receives an Observable<Hero[]>
    // then we call subscribe on it as in Observable.subscribe()
    // The new version waits for the Observable to emit the array of heroes— which
    //  could happen now or several minutes from now. Then subscribe passes
    // the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }


}
