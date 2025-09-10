import { Component, signal } from '@angular/core';
import { ScrollingMenuComponent } from '../scrolling-menu/scrolling-menu.component';

@Component({
  selector: 'app-online-orders',
  standalone: true,
  imports: [ScrollingMenuComponent],
  templateUrl: './online-orders.component.html',
  styleUrl: './online-orders.component.scss'
})
export class OnlineOrdersComponent {
  message = signal('Appetizers');
}
