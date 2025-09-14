import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item-card',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent {
  @Input() item?: { title: string; price: number };
}
