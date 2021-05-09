import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Donee } from './Donee';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public angularFirestore: AngularFirestore) { }

  yeniKayit(kayit: any) {
    return this.angularFirestore.collection('donor').add(kayit);
  }


  kayitlariOku(alan, yon) {
    return this.angularFirestore.collection('donor', ref => ref.orderBy(alan, yon)).snapshotChanges();
  }
  guncelle(id, deger) {
    this.angularFirestore.doc('donor' + id).update(deger)
      ;  }
  kayitSil(id) {
    this.angularFirestore.doc('donor/' + id).delete();
      }
}
