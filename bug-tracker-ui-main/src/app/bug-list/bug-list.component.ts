import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, Role } from "../_models";
import { AuthenticationService } from "../_services";
import { CommonApiService } from "src/app/_services/CommonApi.service";
import { ToastNotificationService } from "../_services/toaster.service";
import { NotificationType } from "../_models/notificationtype.enum";

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent   implements OnInit {
  user!: User;
  listofBugs: any = [];
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
    this.commonApiservice.getAllBug().subscribe((data) => {
      this.listofBugs = data.map((x)=>{
        return {...x,statusval:x.status==true?'inprocess':'completed'}
      });
      console.log(data, this.listofBugs);
      this.cdr.detectChanges();
    });
  }
  get isAdmin() {
    // console.log(this.user);
    return this.user && this.user.role === Role.manager;
  }
  get istester() {
    // console.log(this.user);
    return this.user && this.user.role === Role.tester;
  }
  get isdeveloper() {
    // console.log(this.user);
    return this.user && this.user.role === Role.developer;
  }
  enableUser(bug) {
    let bugdata = bug;
    bug.status = true
    this.commonApiservice.updateBug(bugdata).subscribe(() => {
      // console.log("user enabled");
      this.notificattion.createNotification(
        NotificationType.SUCCESS,
        "Bug",
        "Bug Information updated"
      );
      this.getall();
    });
  }
  disableUser(bug) {
    let bugdata = bug;
    bug.status = false
    this.commonApiservice.updateBug(bugdata).subscribe(() => {
      // console.log("user enabled");
      this.notificattion.createNotification(
        NotificationType.SUCCESS,
        "Bug",
        "Bug Information updated"
      );
      this.getall();
    });
  }
  delete(bug){
    
    // let bugdata = bug;
    // bug.status = false
    this.commonApiservice.deletBug({_id:bug._id}).subscribe(() => {
      // console.log("user enabled");
      this.notificattion.createNotification(
        NotificationType.SUCCESS,
        "Bug",
        "Bug Deleted"
      );
      this.getall();
    });
  }
}
