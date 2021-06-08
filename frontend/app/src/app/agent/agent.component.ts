import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RealEstate } from '../models/real-estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private realEstateService: RealEstateService) { }

  ngOnInit(): void {
    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      data = data.filter(re => re.approved == true);
      this.showRentPriceChart(data.filter(re => re.sale == 0));
      this.showSalePriceChart(data.filter(re => re.sale == 1));
      this.showCityChart(data);
      this.showApartmentChart(data.filter(re => re.type == 1));
      this.showHouseChart(data.filter(re => re.type == 0));
    });
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
        backgroundColor: 'rgb(190, 110, 219)',
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
          DBdata.filter(re => re.city == 'Ostalo').length
        ],
        fill: true,
        backgroundColor: 'rgb(219, 110, 164)',
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
        backgroundColor: 'rgb(82, 217, 143)',
        tension: 0.1
      }]
    };

    this.apartmentChart = new Chart("apartmentChart", {
      type: 'horizontalBar',
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
        backgroundColor: 'rgb(224, 174, 99)',
        tension: 0.1
      }]
    };

    this.houseChart = new Chart("houseChart", {
      type: 'horizontalBar',
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
