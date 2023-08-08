import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/userService/user-service.service';
import { SessionService } from 'src/app/Services/session/session.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 @ViewChild('dropdown')
  dropdown!: ElementRef;
  greeting: string = '';
  userName: string = '';
  email: string = '';
  user_id: string = '';
  public profileDetails: any = {
    'firstName' : 'Sonam',
    'lastName' : 'Kumari',
    'email' : 'sonam@gmail.com',
    'user_id' : '101',
  };
  public userIcon = '../../../../assets/avatar-removebg-preview.png';
  contact: string = '';
  changeProfilePic: boolean = false;
  showProfileSection: boolean = false;
  showProfileBtnClicked: boolean = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}


  ngOnInit(): void {
    var today = new Date();
    var curHr = today.getHours();
    
    if (curHr < 12) {
      this.greeting = 'Good Morning';
    } else if (curHr < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
    this.getUserData();
  }
  
  getUserData() {
    this.userName =
      this.profileDetails.firstName + ' ' + this.profileDetails.lastName;
    this.email = this.profileDetails.email_id;
    this.contact = this.profileDetails.contact;
    this.user_id = this.profileDetails.user_id;
  }

  logOutUser() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logout');
  }
  
  openProfile() {
    this.showProfileBtnClicked = true;
    this.showProfileSection = !this.showProfileSection;
  }
  navigateTo(data: string) {
    this.showProfileBtnClicked = false;
    this.showProfileSection = false;
    this.router.navigate([this.router.url.split('/')[1] + data]);
  }

}
