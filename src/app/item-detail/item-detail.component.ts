import { Component, OnInit } from '@angular/core';
import { Category } from '../data/category';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../data/shopping-list';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  imports: [IonicModule,FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class ItemDetail  implements OnInit {

  item : Item = new Item()
  categories : Array<Category> = []

  public itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    category: new FormControl(0, Validators.required)
  });

  constructor(
      private shoppingListService : ShoppingListService,
      private formBuilder : FormBuilder,
      private router : Router,
      private route : ActivatedRoute) { }

  /*ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.buttonService.getButton(id).then(
          data => {
            this.button = data
            this.buttonForm = this.formBuilder.group(this.button)
        })
    }
    this.buttonService.getCategories().then(
      data => this.categories = data
    )
  }*/

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.shoppingListService.getItem(id).then(
        (data: Item) => {
          console.log("DATA-LOG:" + data);
          this.item = data;
          this.itemForm = this.formBuilder.group(this.item);
        });
    }
    this.shoppingListService.getCategories().then(
      (data: Category[]) => this.categories = data
    );
  }

  async create () {
    await this.router.navigate(['tabs/tab3/list'])
  }

  async back () {
    await this.router.navigate(['tabs','tab3'])
  }

  saveItem (formData : any) {
    console.log('Form Data:', formData);
    this.item = Object.assign({}, formData); // Achten Sie darauf, eine Kopie zu erstellen

    console.log('Item to be saved:', this.item);

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

 /* saveItem (formData : any) {
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
  }*/

}
