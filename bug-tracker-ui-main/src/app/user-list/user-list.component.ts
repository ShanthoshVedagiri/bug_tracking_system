import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, Role } from "../_models";
import { AuthenticationService } from "../_services";
import { CommonApiService } from "src/app/_services/CommonApi.service";
import { ToastNotificationService } from "../_services/toaster.service";
import { NotificationType } from "../_models/notificationtype.enum";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  user!: User;
  listofUsers: any = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonApiservice: CommonApiService,
    private cdr: ChangeDetectorRef,
    private readonly notificattion: ToastNotificationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.getall();
  }
  getall() {
    this.commonApiservice.getAllUsers().subscribe((data) => {
      this.listofUsers = data;
      console.log(data, this.listofUsers);
      this.cdr.detectChanges();
    });
  }
  get isAdmin() {
    // console.log(this.user);
    return this.user && this.user.role === Role.manager;
  }
  enableUser(email) {
    this.commonApiservice.enableuser(email).subscribe(() => {
      console.log("user enabled");
      this.notificattion.createNotification(
        NotificationType.SUCCESS,
        "User",
        "User Enabled"
      );
      this.getall();
    });
  }
  disableUser(email) {
    this.commonApiservice.disableuser(email).subscribe(() => {
      console.log("user disabled");
      this.notificattion.createNotification(
        NotificationType.SUCCESS,
        "User",
        "User Disabled"
      );
      this.getall();
    });
  }
}
