import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from '../_models/notificationtype.enum';
// import { NotificationType } from '../enums/notificationtype.enum';
@Injectable({ providedIn: 'root' })
export class ToastNotificationService {
  constructor(private toastr: ToastrService) {}

  createNotification(type: NotificationType, header: string, data: any): void {
    switch (type) {
      case NotificationType.ERROR:
        this.toastr.error(data, header);
        break;
      case NotificationType.WARNING:
        this.toastr.warning(data, header);
        break;
      case NotificationType.SUCCESS:
        this.toastr.success(data, header);
        break;
    }
  }
}
