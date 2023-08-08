import { Component } from '@angular/core';
import { ISSUES } from './ISSUES';
import { UserServiceService } from 'src/app/Services/userService/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { Buffer } from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  user_id: any;
  issues: ISSUES[] = [];
  titleFilter: any = undefined;
  categoryFilter: any = undefined;
  dateFilter: any = undefined;
  statusFilter: any = undefined;
  isResisable: boolean = true;
  visible: boolean = false;
  visibleImage: boolean = false;
  slicedDescription: any;
  attributeData: any = {};
  attached: any = {};

  constructor(
    private userService: UserServiceService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getIssues();
  }
  getIssues() {
    this.user_id = sessionStorage.getItem('user_id');
    const req = {
      user_id: this.user_id,
    };
    this.userService.getIssues(req).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        this.issues = data.data;
        console.log(this.issues);
      } else {
        this.issues = [];
        this.toastr.warning('No data!');
      }
    });
  }
  filter() {
    let req = new FormData();
    req.append('category', this.categoryFilter);
    req.append('title', this.titleFilter);
    req.append('date', this.dateFilter);
    req.append('status', this.statusFilter);
    this.userService.filterRows(req).subscribe((data) => {
      if (data.statusCode == 200) {
        this.issues = data.data;
        this.toastr.success('Issues fetched successfully!');
      } else {
        this.issues = [];
        this.toastr.warning('No data!');
      }
    });
  }

  imgSrc: any;
  async renderImg(pdf: any) {
    this.userService.getImg(pdf).subscribe((data) => {
      data = Buffer.from(data, 'base64');
      this.imgSrc = data;
      this.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      this.attached['image'] = this.imgSrc;
      this.visibleImage = true;
    });
  }

  showDialog(desc: any) {
    this.visible = true;
    this.attributeData['description'] = desc;
  }
}
