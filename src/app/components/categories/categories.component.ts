import { NgFor } from '@angular/common';
import { Component, input, Inject, Input } from '@angular/core';

@Component({
  selector: 'menu-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() category!: string;

  scrollToCategory(categoryId: string) {
    const element = document.getElementById(categoryId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
