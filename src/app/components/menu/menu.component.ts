import { NgFor, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { MenuItemCardComponent } from '../../menu-item-card/menu-item-card.component';
import menuData from './menu-data.json';
import { CategoriesComponent } from '../categories/categories.component';

type MenuItem = { title: string; price: number };
type Category = { id: string; label: string; items: MenuItem[] };

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, MenuItemCardComponent, CategoriesComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  categories: Category[] = Object.entries(menuData).map(([label, items]) => ({
    id: this.slugify(label),
    label,
    items: items as MenuItem[]
  }));

  activeCategoryId: string | null = this.categories[0]?.id ?? null;

  @ViewChildren('categorySection') sections!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const hasIO = typeof (window as any).IntersectionObserver !== 'undefined';
    if (!hasIO) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeCategoryId = entry.target.id;
          }
        });
      },
      { root: null, rootMargin: '-120px 0px -60%', threshold: 0.1 }
    );

    this.sections.forEach((sec) => observer.observe(sec.nativeElement));
  }

  scrollToCategory(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private slugify(label: string): string {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}
