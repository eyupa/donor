import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.class';




@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  async signup(user) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('kullanıcı Kaydı hatası:', error);

    }
  }
  async login(user) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log(error);

    }
  }
  logout() {
    this.angularFireAuth.signOut();
  }
  }

