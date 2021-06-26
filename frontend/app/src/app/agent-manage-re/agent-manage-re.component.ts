import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { RealEstate } from '../models/real-estate';
import { OfferService } from '../offer.service';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-agent-manage-re',
  templateUrl: './agent-manage-re.component.html',
  styleUrls: ['./agent-manage-re.component.css']
})
export class AgentManageReComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private offerService: OfferService,
    private notif: MatSnackBar,
    private router: Router) { }

  real_estate: RealEstate[];
  offers: Offer[];

  ngOnInit(): void {
    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      this.real_estate = data;
    })
    this.offerService.getAllOffersService().subscribe((data: Offer[]) => {
      this.offers = data.filter(o => o.valid == false && o.accepted == true);
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

  openPage(selectedRealEstate): void {
    localStorage.setItem('viewRealEstate', JSON.stringify(selectedRealEstate));
    this.router.navigate(['/realestate']);
  }

  validateOffer(offer): void {
    let sale: number = this.real_estate.find(r => r._id == offer.realestate).sale;

    this.offerService.validateOfferService(offer._id).subscribe(response => {
      this.realEstateService.sellRealEstateService(
        offer.realestate,
        sale,
        offer.owner,
        offer.client,
        offer.amount
      ).subscribe(response => {
        this.notif.open("Ugovorena prodaja je uspešno odobrena.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      }, error => { 
        this.notif.open("Ugovorena prodaja nije uspešno odobrena! Pokušajte ponovo.", "OK");
      });
    }, error => {
      this.notif.open("Ugovorena prodaja nije uspešno odobrena! Pokušajte ponovo.", "OK");
    });
  }

  deleteOffer(offer): void {
    this.offerService.deleteOfferService(offer._id, offer.realestate).subscribe(response => {
      this.notif.open("Ugovorena prodaja je uspešno odbačena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Ugovorena prodaja nije uspešno odbačena! Pokušajte ponovo.", "OK");
    });
  }

}
