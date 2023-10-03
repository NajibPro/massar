import { Component, ElementRef, Renderer2 } from '@angular/core';
import { GlobalFunctionsService } from '../services/global-functions.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-visitor',
  templateUrl: './nav-visitor.component.html',
  styleUrls: ['./nav-visitor.component.css']
})
export class NavVisitorComponent {

  constructor(private r: Renderer2, private el: ElementRef, public gf: GlobalFunctionsService, private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url)
        this.updateNavWritings();
      }
    });

    window.addEventListener('popstate', () => {
      // Reload the page
      location.reload();
    });
  }
  hideNavBar(){
    const nav = this.el.nativeElement.querySelector('.nav-writings')
    this.r.removeClass(nav, 'visible-nav');
    this.isHamburgerVisible = true
  }

  showNavBar(){
    const nav = this.el.nativeElement.querySelector('.nav-writings')
    this.r.addClass(nav, 'visible-nav');
    this.isHamburgerVisible = false
  }

  navElementsList = [false, false, false, false, false];
  selectedIndex = 1;

  animateNav(n: number) {
    this.navElementsList = this.navElementsList.map((value, index) => index === n);
    this.selectedIndex = n;
  }

  updateNavWritings(){
    if(this.router.url === '/login' || this.router.url === '/signup'){
      this.isNavComponentsVisible = false
      return
    }

    const currentRoute = this.router.url;
    console.log(currentRoute)

    if (currentRoute === '/') {
      this.navElementsList[0] = true;
      
    } else if (currentRoute === '/about') {
      this.navElementsList[1] = true;
      
    } else if (currentRoute === '/contact') {
      this.navElementsList[2] = true;
      
    } else if (currentRoute === '/faq') {
      this.navElementsList[3] = true;
      
    } else if (currentRoute === '/community') {
      this.navElementsList[4] = true;
      
    } else {
      this.navElementsList[0] = true;
      
    }
  }


  
  isHamburgerVisible = true
  isNavComponentsVisible = true
}
