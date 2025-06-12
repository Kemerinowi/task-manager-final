import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth
      .register(this.email, this.password)
      .then(() => this.router.navigate(['/tasks']))
      .catch((err) => (this.error = err.message));
  }
}
