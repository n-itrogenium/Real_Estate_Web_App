import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private realEstateService: RealEstateService) { }

  user: User;

  real_estate: RealEstate[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data.filter(re => re.approved == true && re.sold == false);
      //this.result_real_estate = data;
    })
    this.applyCityFilter = false;
    this.applyMinPriceFilter = false;
    this.applyMaxPriceFilter = false;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
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


  openPage(selectedRealEstate): void {
    localStorage.setItem('viewRealEstate', JSON.stringify(selectedRealEstate));
    this.router.navigate(['/realestate']);
  }

}
