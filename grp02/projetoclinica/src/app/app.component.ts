import { Component } from '@angular/core';
import { Tab3Page } from './tab3/tab3.page';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    tab3Page: Tab3Page;
  }
}
