import { Component, input } from '@angular/core';

@Component({
  selector: 'app-scrolling-menu',
  standalone: true,
  imports: [],
  templateUrl: './scrolling-menu.component.html',
  styleUrl: './scrolling-menu.component.scss'
})
export class ScrollingMenuComponent {
  p1 = input();

  onClick(event: Event) {
    console.log('Button clicked!', event);
  }
}
