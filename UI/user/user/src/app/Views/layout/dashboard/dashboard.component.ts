import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  public currentRoute: string;
  constructor(
    private router: Router
  ) {
    this.currentRoute = this.router.url;
  }
}
