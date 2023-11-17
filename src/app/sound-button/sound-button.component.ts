import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SoundButtonService } from '../services/button.service';
import { Router } from '@angular/router';
import { SoundButton } from '../data/sound-button';
import { Category } from '../data/category';

@Component({
  selector: 'app-sound-button',
  templateUrl: './sound-button.component.html',
  styleUrls: ['./sound-button.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SoundButtonComponent  implements OnInit {

  @Input() category: any;

  buttons : Array<SoundButton> | null = []
  categories : Array<Category> | null = []

  constructor(
    private buttonService : SoundButtonService,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.buttonService.getCategories()
      .then(data => {
        this.categories = data
      })
    this.buttonService.getButtons()
      .then(data => {
        this.buttons = data
      })
  }

  getButtonsOfCategory (category : number) {
    let filteredButtons : Array<SoundButton> = []
    if (this.buttons) {
      filteredButtons = this.buttons
        .filter(button => button.category == category)
    }
    return filteredButtons

  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  async edit (button:SoundButton) {
    await this.router.navigate(['tabs/tab4/button', button.id])
  }

  delete (button:SoundButton) {
    this.buttonService.deleteButton(button)
      .then(payload =>  {
        this.buttonService.getButtons()
          .then(data => {
            this.buttons = data
          })
      })
  }

}
