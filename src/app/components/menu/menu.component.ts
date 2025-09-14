import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItemCardComponent } from "../../menu-item-card/menu-item-card.component";
import menuData from './menu-data.json';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, MenuItemCardComponent, CategoriesComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
menuCategories = Object.entries(menuData);
}
