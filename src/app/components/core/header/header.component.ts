import {Component} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {UserInfoComponent} from './components/user-info/user-info.component';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    UserInfoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
