import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { Rent } from '../models/rent';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private notif: MatSnackBar,
    private router: Router) { }

  real_estate: RealEstate;
  user: User;
  gallery_index: number[] = [];

  day1: number;
  month1: number;
  year1: number;

  day2: number;
  month2: number;
  year2: number;

  message: string;
  free: boolean = false;

  part: number;
  pay: boolean = false;

  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  ngOnInit(): void {
    this.real_estate = JSON.parse(localStorage.getItem('viewRealEstate'));
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || (this.user != null && this.user.type != 1 && this.user.type != 2))
      this.router.navigate(['/pageNotFound']);
    this.part = this.real_estate.price * 20 / 100;
    for (let i = 0; i < this.real_estate.gallery.length; i++)
      this.gallery_index.push(i);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  checkDate(): void {
    if (this.day1 == null || this.month1 == null || this.year1 == null ||
      this.day2 == null || this.month2 == null || this.year2 == null) {
      this.notif.open("Sva polja su obavezna!", "OK");
      return;
    }
    if (([4, 6, 9, 11].find(n => n == this.month1) && this.day1 == 31) ||
      ([4, 6, 9, 11].find(n => n == this.month2) && this.day2 == 31) ||
      (this.month1 == 2 && this.year1 != 2024 && this.day1 > 28) ||
      (this.month1 == 2 && this.year1 == 2024 && this.day1 > 29) ||
      (this.month2 == 2 && this.year2 != 2024 && this.day2 > 28) ||
      (this.month2 == 2 && this.year2 == 2024 && this.day2 > 29) ||
      (this.year1 > this.year2) ||
      (this.year1 == this.year2 && parseInt(this.month1.toString()) > parseInt(this.month2.toString())) ||
      (this.year1 == this.year2 && this.month1 == this.month2 && parseInt(this.day1.toString()) > parseInt(this.day2.toString()))) {
      this.notif.open("Neispravan datum! Pokušajte ponovo.", "OK");
      return;
    }
    let date1 = new Date(this.year1 + "-" + this.month1 + "-" + this.day1);
    let date2 = new Date(this.year2 + "-" + this.month2 + "-" + this.day2);

    this.realEstateService.getRentsService().subscribe((data: Rent[]) => {
      data = data.filter(rent => rent.valid == true && rent.realestate == this.real_estate._id);
      for (let i = 0; i < data.length; i++) {
        let startdate = new Date(data[i].startdate);
        let enddate = new Date(data[i].enddate);
        if (date1 > startdate && date1 < enddate ||
          date2 > startdate && date2 < enddate ||
          date1 <= startdate && date2 >= enddate) {
          this.free = false;
          this.message = "Nekretnina nije dostupna u ovom periodu.";
          return;
        }
      }
      this.free = true;
      this.message = "Nekretnina je dostupna u ovom periodu."
    });
  }

  reserve(): void {
    let date1 = new Date(this.year1 + "-" + this.month1 + "-" + this.day1);
    let date2 = new Date(this.year2 + "-" + this.month2 + "-" + this.day2);
    this.realEstateService.reserveService(
      this.real_estate._id,
      this.user.username,
      date1,
      date2).subscribe(response => {
        this.notif.open("Uspešno ste ostvarili rezervaciju.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Rezervacija nije ostvarena! Pokušajte ponovo.", "OK");
    })
  }

  participation(): void {
    this.pay = !this.pay;
  }

}
