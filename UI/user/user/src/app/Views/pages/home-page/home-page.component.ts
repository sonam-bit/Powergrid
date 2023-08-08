import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/Services/userService/user-service.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  total: any;
  closed: any;
  pending: any;
  user_id: any;
  public chart: any;

  constructor(
    public userService: UserServiceService,
    public charts: NgChartsModule
  ) {}

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  ngOnInit() {
    this.issueStatus();
  }

  issueStatus() {
    this.user_id = sessionStorage.getItem('user_id');
    const req = {
      user_id: this.user_id,
    };
    this.userService.getIssueStatus(req).subscribe((data) => {
      if (data.statusCode == 200) {
        this.total = data.data[0].totalIssues;
        this.closed = data.data[0].approvedIssues;
        this.pending = this.total - this.closed;
        this.createChart();
      } else {
        console.log('No data available');
      }
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: ['Pending', 'Closed'],
        datasets: [
          {
            label: 'Issues',
            data: [this.closed, this.pending],
            backgroundColor: ['red', 'green'],
            hoverOffset: 2,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
