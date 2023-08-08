import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { UserServiceService } from 'src/app/Services/userService/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscriber, interval } from 'rxjs';
import * as pdfjs from 'pdfjs-dist';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:8080/api/upload';
// import {FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css'],
})
export class RaiseTicketComponent {
  public category: any;
  public subcategory: any;
  public description: any;
  public title: any;
  public iphost: any;
  public location: any;
  public attach: any;
  fileName!: Observable<any>;
  base64code!: any;
  public user_id: any = sessionStorage.getItem('user_id');
  public urgency: any;
  shortLink: string = '';
  locations: any = [];
  agreed: any = 1;
  progress = 0;
  showProgress = false;

  constructor(
    public sessionService: SessionService,
    public userService: UserServiceService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {}

  onFileChange($event: any) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.converToBase64(file);
  }
  converToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d);
      this.fileName = d;
      this.base64code = d;
    });
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  submit() {
    let req = new FormData();
    req.append('user_id', this.user_id);
    req.append('category', this.category);
    req.append('subcategory', this.subcategory);
    req.append('location', this.location);
    req.append('urgency', this.urgency);
    req.append('title', this.title);
    req.append('description', this.description);
    req.append('iphost', this.iphost);
    req.append('file', this.base64code);
    console.log(this.fileName);
    console.log('attach', this.fileName);
    req.forEach((element) => {
      console.log(element);
    });

    if (
      this.category == undefined ||
      this.subcategory == undefined ||
      this.urgency == undefined ||
      this.title == undefined ||
      this.location == undefined ||
      this.agreed == 0
    ) {
      if (this.location == undefined) {
        this.toastr.error('Please select location');
      }
      if (this.category == undefined) {
        this.toastr.error('Please select category');
      }
      if (this.subcategory == undefined) {
        this.toastr.error('Please select sub-category');
      }
      if (this.title == undefined) {
        this.toastr.error('Please select title');
      }
      if (this.urgency == undefined) {
        this.toastr.error('Please select urgency');
      }
      if (this.agreed == 0) {
        this.toastr.error('Agree the terms and condition.');
      }
    } else if (this.description.length > 3000) {
      this.toastr.warning('Exceeding length!');
    } else {
      console.log('here');
      this.userService.uploadPdf(req).subscribe((data) => {
        if (data.statusCode == 200) {
          interval(2000).subscribe(() => {
            window.location.reload();
            this.toastr.success('Issue Sent');
          });
        } else {
          this.toastr.error('try again');
        }
      });
    }
  }
}
