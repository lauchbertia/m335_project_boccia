import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemDetail } from '../item-detail/item-detail.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ItemDetail, ItemListComponent, ShoppingListComponent],

})
export class Tab5Page {
  constructor(
    private router: Router

  ) { }

  async back() {
    await this.router.navigate(['tabs/tab3/'])
  }

}


