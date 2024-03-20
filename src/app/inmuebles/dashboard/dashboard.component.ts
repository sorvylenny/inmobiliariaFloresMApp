import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { CityResponse } from 'src/app/interfaces/cityresponse';
import { Dashboard } from 'src/app/interfaces/dashboard';
import { DepartmentResponse } from 'src/app/interfaces/departmentresponse';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cities: Dashboard[] = [];
  departments: Dashboard[] = [];

  constructor(private inmubleService: InmueblesService) { }
  ngOnInit(): void {
    this.citiesDashboard();
    this.departmentDashboard();
  }

  departmentDashboard() {
    this.inmubleService.dashBoardDepartment().subscribe((response: DepartmentResponse) => {
      this.departments = response.getDepartmentsMoreRegistered;
      console.log(this.departments);
    });
  }

  citiesDashboard() {
    this.inmubleService.dashBoardCities().subscribe((response: CityResponse) => {
      this.cities = response.getCitiesMoreRegistered;
      console.log(this.cities);
      const labels = this.cities.map(item => item._id);
      const totals = this.cities.map(item => item.total);
      this.mostrarGrafico(labels,totals); // Puedes pasar this.cities a la función mostrarGrafico si es necesario
    });
  }
  mostrarGrafico(labelGrafico:any[], dataGrafico:any[]){
    const chartBarras= new Chart('chartBarras',{
      type:'bar',
      data:{
       labels: labelGrafico,
       datasets:[{
        label:"Total de inmuebles por ciudad",
        data:dataGrafico,
        backgroundColor:['rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'],
        borderColor:['rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'],
        borderWidth:1
       }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero: true,
          }
        }
      }
    });
  }
}
