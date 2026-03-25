import { Component, inject } from '@angular/core';
import { ToastService } from '@services/toast-service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [NgbToast],
  templateUrl: './toast.html',
  styles: ``,
})
export class Toast {
  toastService = inject(ToastService);
}
