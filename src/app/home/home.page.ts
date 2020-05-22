import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu: MenuController,private auth :AuthService) { }

  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }

  logoutAction() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
