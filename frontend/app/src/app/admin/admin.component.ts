import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Chart } from 'chart.js';
import { RealEstateService } from '../real-estate.service';
import { RealEstate } from '../models/real-estate';
import { Percentage } from '../models/percentage';
import { Contract } from '../models/contract';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private adminService: AdminService,
    private offerService: OfferService,
    private notif: MatSnackBar,
    private router: Router) { }

  sale: number;
  rent: number;
  real_estate: RealEstate[];
  contracts: Contract[];
  income: number = 0;

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user == null || (user != null && user.type != 0))
      this.router.navigate(['/pageNotFound']);
      
    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      data = data.filter(re => re.approved == true);
      this.showRentPriceChart(data.filter(re => re.sale == 0));
      this.showSalePriceChart(data.filter(re => re.sale == 1));
      this.showCityChart(data);
      this.showApartmentChart(data.filter(re => re.type == 1));
      this.showHouseChart(data.filter(re => re.type == 0));
      this.real_estate = data;
      this.offerService.getAllContractsService().subscribe((data: Contract[]) => {
        this.contracts = data;
        this.adminService.getPercentageService().subscribe((percentage: Percentage) => {
          if (percentage) {
            this.sale = percentage.sale;
            this.rent = percentage.rent;
  
            for (let i = 0; i < data.length; i++) {
              let re = this.real_estate.find(re => re._id == data[i].realestate);
              let factor: number;
              if (re.sale == 0) {
                factor = (re.owner == 'Agencija') ? 1 : (percentage.rent / 100);
              }
              else {
                factor = (re.owner == 'Agencija') ? 1 : (percentage.sale / 100);
              }
              this.income += data[i].price * factor;
            }
          }
        })
      });
    });
    /*this.adminService.getPercentageService().subscribe((data: Percentage) => {
      if (data) {
        this.sale = data.sale;
        this.rent = data.rent;
      }
    });*/
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  setSalePercentage(): void {
    this.adminService.setSalePercentageService(this.sale).subscribe(response => {
      this.notif.open("Procenat za prodaju je uspešno ažuriran.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
      error => {
        this.notif.open("Procenat nije uspešno ažuriran! Pokušajte ponovo.", "OK");
      })
  }

  setRentPercentage(): void {
    this.adminService.setRentPercentageService(this.rent).subscribe(response => {
      this.notif.open("Procenat za iznajmljivanje je uspešno ažuriran.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
      error => {
        this.notif.open("Procenat nije uspešno ažuriran! Pokušajte ponovo.", "OK");
      })
  }

  rentPriceChart: Chart;
  salePriceChart: Chart;
  cityChart: Chart;
  apartmentChart: Chart;
  houseChart: Chart;

  showRentPriceChart(DBdata): void {
    const data = {
      labels: ['<100', '100-200', '200-300', '300-400', '400-500', '>500'],
      datasets: [{
        label: 'Izdavanje',
        data: [
          DBdata.filter(re => re.price < 100).length,
          DBdata.filter(re => re.price >= 100 && re.price < 200).length,
          DBdata.filter(re => re.price >= 200 && re.price < 300).length,
          DBdata.filter(re => re.price >= 300 && re.price < 400).length,
          DBdata.filter(re => re.price >= 400 && re.price < 500).length,
          DBdata.filter(re => re.price >= 500).length
        ],
        fill: true,
        backgroundColor: 'rgb(110, 194, 219)',
        tension: 0.1
      }]
    };

    this.rentPriceChart = new Chart("rentPriceChart", {
      type: 'bar',
      data: data
    });
  }

  showSalePriceChart(DBdata): void {
    const data = {
      labels: ['<50 000', '50 000-100 000', '100 000 - 150 000', '150 000 - 200 000', '200 000 - 250 000', '250 000-300 000', '>300 000'],
      datasets: [{
        label: 'Prodaja',
        data: [
          DBdata.filter(re => re.price < 50_000).length,
          DBdata.filter(re => re.price >= 50_000 && re.price < 100_000).length,
          DBdata.filter(re => re.price >= 100_000 && re.price < 150_000).length,
          DBdata.filter(re => re.price >= 150_000 && re.price < 200_000).length,
          DBdata.filter(re => re.price >= 200_000 && re.price < 250_000).length,
          DBdata.filter(re => re.price >= 250_000 && re.price < 300_000).length,
          DBdata.filter(re => re.price >= 300_000).length
        ],
        fill: false,
        backgroundColor: 'rgb(110, 194, 219)',
        tension: 0.1
      }]
    };

    this.salePriceChart = new Chart("salePriceChart", {
      type: 'bar',
      data: data
    });
  }

  showCityChart(DBdata): void {
    const data = {
      labels: ['Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Ostalo'],
      datasets: [{
        label: 'Zastupljenost u gradovima',
        data: [
          DBdata.filter(re => re.city == 'Beograd').length,
          DBdata.filter(re => re.city == 'Novi Sad').length,
          DBdata.filter(re => re.city == 'Niš').length,
          DBdata.filter(re => re.city == 'Kragujevac').length,
          DBdata.filter(re => re.city != 'Beograd' && re.city != 'Novi Sad' && re.city != 'Niš' && re.city != 'Kragujevac').length
        ],
        fill: true,
        backgroundColor: 'rgb(110, 194, 219)',
        tension: 0.1
      }]
    };

    this.rentPriceChart = new Chart("cityChart", {
      type: 'pie',
      data: data
    });
  }

  showApartmentChart(DBdata): void {
    const data = {
      labels: ['Prodaja', 'Izdavanje'],
      datasets: [{
        label: 'Stanovi',
        data: [
          DBdata.filter(re => re.sale == 1).length,
          DBdata.filter(re => re.sale == 0).length
        ],
        fill: false,
        backgroundColor: 'rgb(110, 194, 219)',
        tension: 0.1
      }]
    };

    this.apartmentChart = new Chart("apartmentChart", {
      type: 'bar',
      data: data
    });
  }

  showHouseChart(DBdata): void {
    let sale = DBdata.filter(re => re.sale == 1);
    console.log(sale.length);
    const data = {
      labels: ['Prodaja', 'Izdavanje'],
      datasets: [{
        label: 'Kuće',
        data: [
          sale.length,
          DBdata.filter(re => re.sale == 0).length
        ],
        fill: false,
        backgroundColor: 'rgb(110, 194, 219)',
        tension: 0.1
      }]
    };

    this.houseChart = new Chart("houseChart", {
      type: 'bar',
      data: data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
