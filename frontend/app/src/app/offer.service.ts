import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllOffersService() {
    return this.http.get(`${this.uri}/offer/getAllOffers`);
  }

  makeOfferService(realestate, owner, client, amount) {
    const data = {
      realestate: realestate,
      owner: owner,
      client: client,
      amount: amount
    }
    return this.http.post(`${this.uri}/offer/makeOffer`, data);
  }

  acceptOfferService(offer_id, realestate) {
    const data = {
      offer_id: offer_id,
      realestate: realestate
    }
    return this.http.post(`${this.uri}/offer/acceptOffer`, data);
  }

  declineOfferService(offer_id) {
    const data = {
      offer_id: offer_id
    }
    return this.http.post(`${this.uri}/offer/declineOffer`, data);
  }

  validateOfferService(offer_id) {
    const data = {
      offer_id: offer_id
    }
    return this.http.post(`${this.uri}/offer/validateOffer`, data);
  }

  deleteOfferService(offer_id, realestate) {
    const data = {
      offer_id: offer_id,
      realestate: realestate
    }
    return this.http.post(`${this.uri}/offer/deleteOffer`, data);
  }

  getAllContractsService() {
    return this.http.get(`${this.uri}/offer/getAllContracts`);
  }
  
}
