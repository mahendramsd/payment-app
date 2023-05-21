import { Component } from '@angular/core';
import { User } from './model/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'payment-app';
  user?: User | null;


  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);
}

logout() {
    this.authService.logout();
}

}
