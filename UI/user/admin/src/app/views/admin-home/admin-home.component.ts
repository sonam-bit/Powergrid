import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISSUES } from './ISSUES';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { interval, Subject } from 'rxjs';
import { Dialog } from 'primeng/dialog';
import { Buffer } from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  user_id: any;
  issues: ISSUES[] = [];
  titleFilter: any = undefined;
  categoryFilter: any = undefined;
  dateFilter: any = undefined;
  statusFilter: any = undefined;
  selectedStatus: any = undefined;
  visible: boolean = false;
  attributeData: any = {};
  visibleImage: boolean = false;
  attached: any = {};

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getIssues();
  }
  getIssues() {
    this.adminService.getallIssues().subscribe((data) => {
      if (data.statusCode == 200) {
        this.issues = data.data;
        console.log(this.issues);
      } else {
        this.issues = [];
      }
    });
  }
  filter() {
    let req = new FormData();
    req.append('category', this.categoryFilter);
    req.append('title', this.titleFilter);
    req.append('date', this.dateFilter);
    req.append('status', this.statusFilter);
    console.log(this.statusFilter);
    console.log(req);
    this.adminService.filterallRows(req).subscribe((data) => {
      if (data.statusCode == 200) {
        this.issues = data.data;
        console.log(this.issues);
        // console.log(this.issues.);
        this.toastr.success('Issues fetched successfully!');
      } else {
        this.issues = [];
      }
    });
  }

  updateStatus(code: any, issue_id: any) {
    let req = [code, issue_id];
    if (code != 2) {
      let remark = window.prompt('Please enter the remark for the issue');
      if (remark != null) {
        let req1 = new FormData();
        req1.append('remark', remark);
        req1.append('issue_id', issue_id);
        this.adminService.setremark(req1).subscribe((data) => {
          if (data.statusCode == 200) {
            this.toastr.success('Remark Sent');
          } else {
            this.toastr.error('Try again');
          }
        });
        this.adminService.changeStatus(req).subscribe((data) => {
          if (data.statusCode == 200) {
            this.toastr.success('Status Updated Successfully.');
            this.getIssues();
          } else {
            this.toastr.error('Try Again!');
          }
        });
      }
    } else if (code == 2) {
      let ans = window.confirm('Are you sure you want to delete');
      if (ans) {
        this.adminService.changeStatus(req).subscribe((data) => {
          if (data.statusCode == 200) {
            this.toastr.success('Status Updated Successfully.');
            this.getIssues();
          } else {
            this.toastr.error('Try Again!');
          }
        });
      } else {
        this.toastr.warning('Issue not deleted.');
      }
    }
  }

  showDialog(desc: any) {
    this.visible = true;
    this.attributeData['description'] = desc;
  }

  imgSrc: any;
  async renderImg(pdf: any) {
    this.adminService.getImg(pdf).subscribe((data) => {
      data = Buffer.from(data, 'base64');
      this.imgSrc = data;
      this.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      this.attached['image'] = this.imgSrc;
      this.visibleImage = true;
    });
  }
}
