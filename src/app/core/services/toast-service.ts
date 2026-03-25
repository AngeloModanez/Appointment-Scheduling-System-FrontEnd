import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toasts: any) {
    this.toasts = this.toasts.filter((t) => t !== toasts);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  success(text: string) {
    this.show(text, {
      className: 'bg-success text-white border-0',
      icon: 'bi bi-check-circle'
    });
  }

  error(text: string) {
    this.show(text, {
      className: 'bg-danger text-white border-0',
      icon: 'bi bi-x-circle-fill'
    });
  }
}
