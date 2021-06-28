import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private router: Router) { }

  real_estate: RealEstate[];
  promo: RealEstate[];
  //result_real_estate: RealEstate[];

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user != null)
      this.router.navigate(['/pageNotFound']);
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data.filter(re => re.approved == true && re.sold == false);
      this.promo =data.filter(re => re.approved == true && re.sold == false && re.promo == true);
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
    this.applyCityFilter = false;
    this.applyMinPriceFilter = false;
    this.applyMaxPriceFilter = false;

    if (this.searchCity != null && this.searchCity != "") {
      this.findCity = this.searchCity;
      this.applyCityFilter = true;
    }

    if (this.minPrice != null) {
      this.findMinPrice = this.minPrice;
      this.applyMinPriceFilter = true;
    }
    
    if (this.maxPrice != null) {
      this.findMaxPrice = this.maxPrice;
      this.applyMaxPriceFilter = true;
    }
 
  }

}
