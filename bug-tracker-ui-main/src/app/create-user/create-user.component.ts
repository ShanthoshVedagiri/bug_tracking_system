import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder, UntypedFormGroup, Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationType } from "../_models/notificationtype.enum";
import { CommonApiService } from "../_services/CommonApi.service";
import { ToastNotificationService } from "../_services/toaster.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  Roles: any = [
    { key: "Manager", value: "manager" },
    { key: "Developer", value: "developer" },
    { key: "Tester", value: "tester" },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private apiservice: CommonApiService,
    private router:Router,
    private readonly notificattion: ToastNotificationService
 
  ) {
    
    this.validateForm = this.fb.group({
      userfirstname: [null, [Validators.required]],
      userlastname: [null, [Validators.required]],
      useremail: [null, [Validators.email, Validators.required]],
      userpasswordhash: [null, [Validators.required]],

      userroles: [null, [Validators.required]],
    });
  }
  changeRole(e: any) {
    this.validateForm.patchValue({ userroles: [e.target.value] });
    // console.log(e.target.value);
  }
  ngOnInit(): void {}
  createuser() {
    debugger
    console.log('hit');
    console.log(this.validateForm.value);
    // debugger
    if (this.validateForm.valid,this.validateForm.value) {
      this.apiservice
        .createUser(this.validateForm.value)
        .subscribe(() => {
          console.log("user created");
          this.validateForm.reset();
          this.notificattion.createNotification(
            NotificationType.SUCCESS,
            "User",
            "User Created"
          );
          this.router.navigateByUrl('/user-list')
        });
    }
  }
}
