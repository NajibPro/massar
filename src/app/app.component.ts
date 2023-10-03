import { Component, HostListener, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'massar-app';

  constructor(private renderer: Renderer2, private router: Router, ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url)
        this.updateNav();
      }
    });

    window.addEventListener('popstate', () => {
      location.reload();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navbar = document.querySelector('app-nav-visitor');

    if (navbar) {
      if (offset === 0) {
        this.renderer.removeClass(navbar, 'nav-in-scroll');
      } else if (offset !== 0 && this.isNavVisible) {
        this.renderer.addClass(navbar, 'nav-in-scroll');
      }
    }
  }

  updateNav(){
    const navbar = document.querySelector('app-nav-visitor');
    if(this.router.url === "/"){
      this.isNavVisible = true
    } else {
      this.isNavVisible = false
      this.renderer.addClass(navbar, 'nav-not-in-scroll')
    }
  }

  isNavVisible = false
}
