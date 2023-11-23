import { Component, OnInit } from '@angular/core';
import { Item, List } from '../data/shopping-list';
import { ShoppingListService } from '../services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../data/category';
import { Food } from '../data/food';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemDetail } from '../item-detail/item-detail.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ItemListComponent implements OnInit {

  items: Array<Item> | null = []
  categories: Array<Category> | null = []
  lists: Array<List> | null = []
  item: Item = new Item()
  listId: number | undefined;
  newItemName: string = '';
  list: List = new List()

  public itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    category: new FormControl(0, Validators.required)
  });

  public listForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadData();

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.shoppingListService.getList(id).then(data => {
        this.list = data;
        this.listForm.setValue(this.list);
      });
    }
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

  saveItemList(formData: any) {
    console.log('Form Data:', formData);

    // Verwende formData anstelle von Object.assign
    this.shoppingListService.createList(formData)
      .then(payload => {
        console.log('Created Item:', payload);
        this.back();
      });
  }

  async addItem(list: List, formData: any) {
    // Aktualisiere die vorhandene Liste mit den neuen Daten
    list.name = formData.name;
  
    // Aktualisiere die Liste über den Service
    await this.shoppingListService.updateList(list);
  
    console.log('Updated List:', list);
  
    // Erstelle das neue Element in der Liste
    await this.shoppingListService.createItem(formData)
      .then(payload => {
        console.log('Created Item:', payload);
        this.back();
      });
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

  async back() {
    await this.router.navigate(['tabs', 'tab2'])
  }

  saveItem(formData: any) {
    console.log('Form Data:', formData);
    this.item = Object.assign(formData);

    if (this.item.id) {
      this.shoppingListService.updateItem(this.item)
        .then(payload => {
          console.log('Updated Item:', payload);
          this.back();
        });
    } else {
      this.shoppingListService.createItem(this.item)
        .then(payload => {
          console.log('Created Item:', payload);
          this.back();
        });
    }
  }


  // 
  //

  
}
