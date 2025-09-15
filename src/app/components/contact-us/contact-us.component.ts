import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  submitted = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
  }

  reset() {
    this.submitted.set(false);
  }
}

