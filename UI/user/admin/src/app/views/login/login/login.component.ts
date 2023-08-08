import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/adminLogin/admin-login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: any;
  adminid: any;
  constructor(
    private route: Router,
    private adminloginService: AdminLoginService,
    private toastr: ToastrService
  ) {}
  loginAdmin() {
    let req = {
      userid: this.adminid,
      password: this.password,
    };
    this.adminloginService.loginAdmin(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.toastr.success('Admin Login Success!');
        sessionStorage.setItem('admin_id', res.data.admin_id);
        sessionStorage.setItem('token', res.data.token);
        this.route.navigate(['adminHome']);
      } else {
        this.toastr.error(res.data);
      }
    });
  }
}
