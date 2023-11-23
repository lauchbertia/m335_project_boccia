import { Component, OnInit } from '@angular/core';
import { Item, List } from '../data/shopping-list';
import { ShoppingListService } from '../services/shopping-list.service';
import { Router } from '@angular/router';
import { Category } from '../data/category';
import { Food } from '../data/food';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class ItemListComponent implements OnInit {

  items: Array<Item> | null = []
  categories: Array<Category> | null = []
  lists: Array<List> | null = []

  listId: number | undefined;
  newItemName: string = '';

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.shoppingListService.getCategories()
      .then(data => {
        this.categories = data
      })
    this.shoppingListService.getItems()
      .then(data => {
        this.items = data
      })
    this.shoppingListService.getLists().then(data => {
      this.lists = data;
    });
  }

  /*getItemsOfList(listId: number): Array<List> {
    let filteredItems: Array<List> = [];
    if (this.lists) {
      filteredItems = this.lists
        .filter(item => item.id === listId);
    }
    return filteredItems;
  }*/

  getItemsOfList(listId: number): Array<Item> {
    let filteredItems: Array<Item> = [];
    if (this.items) {
      filteredItems = this.items.filter(item => item.id === listId);
    }
    return filteredItems;
  }

  async handleRefresh(event: any) {
    await this.loadData()
    event.target.complete()
  }

  async edit(list: List) {
    await this.router.navigate(['tabs/tab2/', list.id])
  }

  delete(list: List) {
    this.shoppingListService.deleteList(list)
      .then(payload => {
        this.shoppingListService.getLists()
          .then(data => {
            this.lists = data
          })
      })
  }

}
