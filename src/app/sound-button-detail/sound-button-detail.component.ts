import { Component, OnInit } from '@angular/core';
import { Category } from '../data/category';
import { CommonModule } from '@angular/common';
import { SoundButtonService } from '../services/button.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundButton } from '../data/sound-button';

@Component({
  selector: 'app-sound-button-detail',
  templateUrl: './sound-button-detail.component.html',
  styleUrls: ['./sound-button-detail.component.scss'],
  imports: [IonicModule,FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class SoundButtonDetailComponent  implements OnInit {

  button : SoundButton = new SoundButton()
  categories : Array<Category> = []

  public buttonForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    category: new FormControl(0, Validators.required)
  })

  constructor(
      private buttonService : SoundButtonService,
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
      this.buttonService.getButton(id).then(
        (data: SoundButton) => {
          this.button = data;
          this.buttonForm = this.formBuilder.group({
            id: [this.button.id],
            name: [this.button.name, Validators.required],
            category: [this.button.category || 0, Validators.required]
          });
        });
    }
    this.buttonService.getCategories().then(
      (data: Category[]) => this.categories = data
    );
  }

  async back () {
    await this.router.navigate(['tabs','tab4'])
  }

  saveButton (formData : any) {
    this.button = Object.assign(formData)

    if (this.button.id) {
      this.buttonService.updateButton(this.button)
        .then(payload=>{
          this.back()
        })
      } else {
        this.buttonService.createButton(this.button)
          .then(payload=>{
            this.back()
          })
      }
  }

}
