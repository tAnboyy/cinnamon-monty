import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, ViewChildren, computed, signal } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MenuItemCardComponent } from '../../menu-item-card/menu-item-card.component';
import menuData from '../menu/menu-data.json';

type MenuItem = { title: string; price: number };
type Category = { id: string; label: string; items: MenuItem[] };

@Component({
  selector: 'app-online-orders',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, MenuItemCardComponent],
  templateUrl: './online-orders.component.html',
  styleUrl: './online-orders.component.scss'
})
export class OnlineOrdersComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // Categories from menu data (same shape as MenuComponent)
  categories: Category[] = Object.entries(menuData).map(([label, items]) => ({
    id: this.slugify(label),
    label,
    items: items as MenuItem[]
  }));

  activeCategoryId: string | null = this.categories[0]?.id ?? null;

  @ViewChildren('categorySection') sections!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  // Cart state
  private cartMap = signal(new Map<string, { item: MenuItem; qty: number }>());

  cartItems = computed(() => Array.from(this.cartMap().values()));
  cartCount = computed(() => this.cartItems().reduce((sum, ci) => sum + ci.qty, 0));
  cartSubtotal = computed(() => this.cartItems().reduce((sum, ci) => sum + ci.item.price * ci.qty, 0));

  addToCart(item: MenuItem) {
    const key = this.keyOf(item);
    const map = new Map(this.cartMap());
    const entry = map.get(key);
    if (entry) {
      map.set(key, { item, qty: entry.qty + 1 });
    } else {
      map.set(key, { item, qty: 1 });
    }
    this.cartMap.set(map);
  }

  inc(item: MenuItem) {
    const key = this.keyOf(item);
    const map = new Map(this.cartMap());
    const entry = map.get(key);
    if (!entry) return;
    map.set(key, { item, qty: entry.qty + 1 });
    this.cartMap.set(map);
  }

  dec(item: MenuItem) {
    const key = this.keyOf(item);
    const map = new Map(this.cartMap());
    const entry = map.get(key);
    if (!entry) return;
    const nextQty = entry.qty - 1;
    if (nextQty <= 0) {
      map.delete(key);
    } else {
      map.set(key, { item, qty: nextQty });
    }
    this.cartMap.set(map);
  }

  qtyFor(item: MenuItem): number {
    return this.cartMap().get(this.keyOf(item))?.qty ?? 0;
  }

  remove(item: MenuItem) {
    const map = new Map(this.cartMap());
    map.delete(this.keyOf(item));
    this.cartMap.set(map);
  }

  clearCart() {
    this.cartMap.set(new Map());
  }

  scrollToCategory(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      this.activeCategoryId = id;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const hasIO = typeof (window as any).IntersectionObserver !== 'undefined';
    if (!hasIO) return;

    this.observer = new IntersectionObserver(
      (entries) => {
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

  private keyOf(item: MenuItem) {
    // Using title as unique key for now
    return item.title.toLowerCase();
  }

  private slugify(label: string): string {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}
