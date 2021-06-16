import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor() { }

  real_estate: RealEstate;
  user: User;

  ngOnInit(): void {
    this.real_estate = JSON.parse(localStorage.getItem('viewRealEstate'));
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
  }

}
