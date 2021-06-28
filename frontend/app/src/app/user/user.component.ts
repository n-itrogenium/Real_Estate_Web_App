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
  promo: RealEstate[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || this.user != null && this.user.type != 1)
      this.router.navigate(['/pageNotFound']);
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data.filter(re => re.approved == true && re.sold == false);
      this.promo = data.filter(re => re.approved == true && re.sold == false && re.promo == true);
      for ( let i: number = 0; i < data.length; i++) {
        if (this.real_estate[i].gallery != null) {
          let random_img: number = Math.floor(Math.random() * this.real_estate[i].gallery.length);
          let help: string;
          help = this.real_estate[i].gallery[0];
          this.real_estate[i].gallery[0] = this.real_estate[i].gallery[random_img];
          this.real_estate[i].gallery[random_img] = help;
        }
      }
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
    let re = this.real_estate.find(re => re._id == selectedRealEstate._id);
    localStorage.setItem('viewRealEstate', JSON.stringify(re));
    this.router.navigate(['/realestate']);
  }

}
