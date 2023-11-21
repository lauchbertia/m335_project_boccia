import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ConfiguratorComponent, ShoppingListComponent],

})
export class Tab3Page {
  constructor() {}
}
