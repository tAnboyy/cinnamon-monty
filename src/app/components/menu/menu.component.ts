import { NgFor, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
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
export class MenuComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  categories: Category[] = Object.entries(menuData).map(([label, items]) => ({
    id: this.slugify(label),
    label,
    items: items as MenuItem[]
  }));

  activeCategoryId: string | null = this.categories[0]?.id ?? null;

  @ViewChildren('categorySection') sections!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const hasIO = typeof (window as any).IntersectionObserver !== 'undefined';
    if (!hasIO) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section to avoid flicker
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible) return;
        const id = (visible.target as HTMLElement).id;
        if (id && id !== this.activeCategoryId) {
          this.activeCategoryId = id;
        }
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: [0.25, 0.5, 0.75] }
    );

    this.sections.forEach((sec) => this.observer!.observe(sec.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollToCategory(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      this.activeCategoryId = id;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private slugify(label: string): string {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}
