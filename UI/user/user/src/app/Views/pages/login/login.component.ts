import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/loginService/login.service';
import { UserServiceService } from 'src/app/Services/userService/user-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
password: any;
userid: any;
constructor(
  private route: Router,
  private userService: UserServiceService,
  private loginService: LoginService,
  private toastr: ToastrService,
) {}
loginUser() {
  let req = {
    userid: this.userid,
    password: this.password,
  };
  this.loginService.loginUser(req).subscribe((res) => {
    if (res.statusCode == 200) {
     
      sessionStorage.setItem('user_id', res.data.user_id);
      sessionStorage.setItem('token', res.data.token);
      console.log(res.data.token);
  
      let req = {
        user_id: res.data,
      };
      this.userService.getUserDetails(req).subscribe((res) => {
        this.userService.setProfileData(res.data);
        this.toastr.success('Login Success');
        this.route.navigate(['/dashboard/home']);
      });
    } else {
      
      this.toastr.error(res.data);
    }
  });
}
}
