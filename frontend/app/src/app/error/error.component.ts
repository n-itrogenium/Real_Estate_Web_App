import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
