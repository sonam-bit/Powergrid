import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  title: any;
  year: any;

  constructor(private router: Router, private clipboard:Clipboard, private toastr: ToastrService) {
  }

  ngOnInit(): void {
   
  }
  navigate(data: any) {
    this.router.navigate([data]);
  }
  profile() {
    this.router.navigate([this.router.url.split('/')[1] + '/profile']);
  }
  cart() {
    this.router.navigate([this.router.url.split('/')[1] + '/cart']);
  }
  navigateToCategory() {
    console.log(this.router.url.split('/')[1] + '/category');
    this.router.navigate([this.router.url.split('/')[1] + '/category']);
  }
  navigateToHome() {
    this.router.navigate([this.router.url.split('/')[1] + '/services']);
  }
  copy()
  {
    this.toastr.success("Phone Number Copied");
    this.clipboard.copy("+917070707XX");
  }
  copyEmail()
  {
    this.toastr.success("Email copied");
    this.clipboard.copy("puneetkrsingh@powergrid.in");
  }
  

}
