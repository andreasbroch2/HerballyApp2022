import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Oversigt', url: '/folder/Oversigt', icon: 'mail' },
    { title: 'Konto', url: '/konto', icon: 'paper-plane' },
    { title: 'Historik', url: '/Historik', icon: 'heart' },
  ];
  constructor() {}
}
