import { Component, ElementRef } from '@angular/core';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  constructor(public gf: GlobalFunctionsService, private elementRef: ElementRef){}

  scrollAfterHero(){
    debugger
    const next = this.elementRef.nativeElement.querySelector('app-why-massar');
    console.log("50")
    if (next) {
      console.log("100")
      next.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
