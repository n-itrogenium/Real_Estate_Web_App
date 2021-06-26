import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../models/real-estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private realEstateService: RealEstateService) { }

  real_estate: RealEstate[];
  //result_real_estate: RealEstate[];

  ngOnInit(): void {
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data.filter(re => re.approved == true && re.sold == false);
      //this.result_real_estate = data;
      for ( let i: number = 0; i < data.length; i++) {
        if (this.real_estate[i].gallery != null) {
          let random_img: number = Math.floor(Math.random() * this.real_estate[i].gallery.length);
          this.real_estate[i].gallery = [ this.real_estate[i].gallery[random_img] ]; 
        }
      }
    })

    

    this.applyCityFilter = false;
    this.applyMinPriceFilter = false;
    this.applyMaxPriceFilter = false;
  }

  searchCity: string; // trenutni sadržaj forme
  findCity: string; // upisano nakon klika na pretraži
  applyCityFilter: boolean;

  minPrice: number; // trenutni sadržaj forme
  findMinPrice: number; // upisano nakon klika na pretraži
  applyMinPriceFilter: boolean;

  maxPrice: number; // trenutni sadržaj forme
  findMaxPrice: number; // upisano nakon klika na pretraži
  applyMaxPriceFilter: boolean;

  search(): void {
    //this.result_real_estate = this.real_estate;
    this.applyCityFilter = false;
    this.applyMinPriceFilter = false;
    this.applyMaxPriceFilter = false;

    if (this.searchCity != null && this.searchCity != "") {
      //this.searchCity = city;
      this.findCity = this.searchCity;
      this.applyCityFilter = true;
      //this.result_real_estate = this.result_real_estate.filter(re => re.city == this.searchCity);
    }

    if (this.minPrice != null) {
      //this.minPrice = min;
      this.findMinPrice = this.minPrice;
      this.applyMinPriceFilter = true;
    }
    
    if (this.maxPrice != null) {
      //this.maxPrice = max;
      this.findMaxPrice = this.maxPrice;
      this.applyMaxPriceFilter = true;
    }

    /*if (this.minPrice != null || this.maxPrice != null) {
      if (this.minPrice == null) this.minPrice = 0;
      if (this.maxPrice == null) this.maxPrice = Number.MAX_SAFE_INTEGER;
      //this.result_real_estate = this.result_real_estate.filter(re => (re.price >= this.minPrice && re.price <= this.maxPrice));
      this.applyPriceFilter = true;
    }*/
 
  }

}
