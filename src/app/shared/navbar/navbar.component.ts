import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User | null = null;
  isMenuOpen = false;

  constructor(private auth: AuthService) {
    this.auth.getCurrentUser().then((u) => (this.user = u));
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.auth.logout();
  }
}
