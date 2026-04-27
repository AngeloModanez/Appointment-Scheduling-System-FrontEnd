import { Injectable, signal } from '@angular/core';

export interface Toast {
  textOrTpl: string;
  className?: string;
  icon?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(textOrTpl: string, options: Partial<Toast> = {}) {
    this.toasts.update(toasts => [...toasts, { textOrTpl, ...options }]);
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

  remove(toast: Toast) {
    this.toasts.update(toasts => toasts.filter(t => t !== toast));
  }

  clear() {
    this.toasts.set([]);
  }
}
