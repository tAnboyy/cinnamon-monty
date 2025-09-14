import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OnlineOrdersComponent } from './components/online-orders/online-orders.component';
import { FooterComponent } from "./footer/footer.component";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, OnlineOrdersComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Cinnamon';
}
