import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RealEstate } from '../models/real-estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-agent-manage-re',
  templateUrl: './agent-manage-re.component.html',
  styleUrls: ['./agent-manage-re.component.css']
})
export class AgentManageReComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private notif: MatSnackBar) { }

  real_estate: RealEstate[];

  ngOnInit(): void {
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data;
    })
  }

  approveRealEstate(re): void {
    this.realEstateService.approveRealEstateService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno odobrena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Nekretnina nije uspešno odobrena! Pokušajte ponovo.", "OK");
    })
  }

  deleteRealEstate(re): void {
    this.realEstateService.deleteRealEstateService(re._id).subscribe(response => {
      this.notif.open("Zahtev je uspešno odbačen.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Zahtev nije uspešno odbačen! Pokušajte ponovo.", "OK");
    })
  }

  promoteRealEstate(re): void {
    this.realEstateService.promoteRealEstateService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno dodata u promovisane.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Nekretnina nije dodata u promovisane! Pokušajte ponovo.", "OK");
    })
  }

  removeFromPromoted(re): void {
    this.realEstateService.removeFromPromotedService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno uklonjena iz promovisanih.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Nekretnina nije uklonjena iz promovisanih! Pokušajte ponovo.", "OK");
    })
  }

}
