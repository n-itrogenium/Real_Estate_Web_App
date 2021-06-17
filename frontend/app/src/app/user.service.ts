import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  signInService(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
    //zovemo http://localhost:4000/users/login i šaljemo podatke data
  }

  registerUserService(name, surname, username, password, avatar, mail, city, country, type) {
    const data = {
      name: name,
      surname: surname,
      username: username,
      password: password,
      avatar: avatar,
      mail: mail,
      city: city,
      country: country,
      type: type
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  getAllUsersFromService() {
    return this.http.get(`${this.uri}/users/getAllUsers`);
  }

  updateUserService(name, surname, username, avatar, mail, city, country, type) {
    const data = {
      name: name,
      surname: surname,
      username: username,
      avatar: avatar,
      mail: mail,
      city: city,
      country: country,
      type: type
    }

    return this.http.post(`${this.uri}/users/updateUser`, data)
  }

  changePasswordService(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  blockUserService(blocker, blocked) {
    const data = {
      blocker: blocker,
      blocked: blocked
    }

    return this.http.post(`${this.uri}/users/blockUser`, data)
  }

  unblockUserService(blocker, blocked) {
    const data = {
      blocker: blocker,
      blocked: blocked
    }

    return this.http.post(`${this.uri}/users/unblockUser`, data)
  }

  getAllBlocksService() {
    return this.http.get(`${this.uri}/users/getAllBlocks`);
  }
  
}
