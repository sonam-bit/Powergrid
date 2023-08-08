import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  logOutAdmin()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logout');
  }

}
