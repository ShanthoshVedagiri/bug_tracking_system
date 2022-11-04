import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationType } from "../_models/notificationtype.enum";
import { CommonApiService } from "../_services/CommonApi.service";
import { ToastNotificationService } from "../_services/toaster.service";

@Component({
  selector: "app-create-bug",
  templateUrl: "./create-bug.component.html",
  styleUrls: ["./create-bug.component.css"],
})
export class CreateBugComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  Severity: any = [
    { key: "High", value: "high" },
    { key: "Medium", value: "medium" },
    { key: "Low", value: "low" },
  ];
  Status: any = [
    { key: "Open", value: "true" },
    { key: "Closed", value: "false" },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private apiservice: CommonApiService,
    private router: Router,
    private readonly notificattion: ToastNotificationService
  ) {
    this.validateForm = this.fb.group({
      bugname: [null, [Validators.required]],
      description: [null, [Validators.required]],
      severity: [null, [Validators.required]],
      status: [null, [Validators.required]], 
      updatedby: [null, [Validators.required]],
      updatedat: [null, [Validators.required]],
    });
  }
  changeRole(e: any) {
    this.validateForm.patchValue({ severity: e.target.value });
    // console.log(e.target.value);
  }
  changeStatus(e: any) {
    this.validateForm.patchValue({ status: e.target.value });
    // console.log(e.target.value);
  }
  ngOnInit(): void {}
  createuser() {
    // debugger;
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    this.validateForm.patchValue({ updatedby: user?.useremail, updatedat: new Date() });
    console.log("hit");
    console.log(this.validateForm.value);
    // debugger
    if ((this.validateForm.valid, this.validateForm.value)) {
      this.apiservice.createBug(this.validateForm.value).subscribe(() => {
        // console.log("user created");
        this.validateForm.reset();
        this.notificattion.createNotification(
          NotificationType.SUCCESS,
          "Bug",
          "Bug Created"
        );
        this.router.navigateByUrl("/bug-list");
      });
    }
  }
}
