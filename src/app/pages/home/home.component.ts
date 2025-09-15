import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import menuData from '../../components/menu/menu-data.json';

type MenuItem = { title: string; price: number };
type Category = { id: string; label: string; items: MenuItem[] };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories: Category[] = Object.entries(menuData).map(([label, items]) => ({
    id: this.slugify(label),
    label,
    items: items as MenuItem[]
  }));

  featured = this.categories.slice(0, 6);

  scrollToTop() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  slugify(label: string): string {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}

