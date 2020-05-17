import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public page_name = "Feed";

  constructor(private menu: MenuController) { }

  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }

  ngOnInit() {
  }

}
