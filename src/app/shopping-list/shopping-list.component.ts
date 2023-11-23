import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Item } from '../data/shopping-list';
import { Category } from '../data/category';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule ]
})
export class ShoppingListComponent  implements OnInit {

  @Input() category: any;

  items : Array<Item> | null = []
  item : Item = new Item()
  categories : Array<Category> | null = []

  constructor(
    private shoppingListService : ShoppingListService,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.shoppingListService.getCategories()
      .then(data => {
        this.categories = data
      })
    this.shoppingListService.getItems()
      .then(data => {
        this.items = data
      })
  }

  getButtonsOfCategory (category : number) {
    let filteredItems : Array<Item> = []
    if (this.items) {
      filteredItems = this.items
        .filter(lists => lists.category == category)
    }
    return filteredItems

  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  async edit (item:Item) {
    await this.router.navigate(['tabs/tab5/item', item.id])
  }

  delete (item:Item) {
    this.shoppingListService.deleteItem(item)
      .then(payload =>  {
        this.shoppingListService.getItems()
          .then(data => {
            this.items = data
          })
      })
  }

  async back () {
    await this.router.navigate(['tabs','tab3'])
  }


  saveItem (formData : any) {
    this.item = Object.assign(formData)

    if (this.item.id) {
      this.shoppingListService.updateItem(this.item)
        .then(payload=>{
          this.back()
        })
      } else {
        this.shoppingListService.createItem(this.item)
          .then(payload=>{
            this.back()
          })
      }
  }

}
