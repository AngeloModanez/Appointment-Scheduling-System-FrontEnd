import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(textOrTlp: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTlp, ...options });
  }

  remove(toasts: any) {
    this.toasts = this.toasts.filter((t) => t !== toasts);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
