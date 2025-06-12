import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    const bg = document.querySelector('.lava-background') as HTMLElement;

    if (bg) {
      bg.style.background = `radial-gradient(circle at ${x}% ${y}%, #ff00cc, #3333ff)`;
    }
  }

  showNavbar(): boolean {
    return !['/login', '/register'].includes(window.location.pathname);
  }
}
