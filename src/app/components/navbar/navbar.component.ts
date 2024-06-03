import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public userService = inject(UserService)

  public account = this.userService.accountPublic

}
