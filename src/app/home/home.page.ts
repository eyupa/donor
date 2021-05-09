import { FirebaseauthService } from './../firebaseauth.service';
import { Component } from '@angular/core';
import { Donee } from '../Donee';
import { FirestoreService } from '../firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ExpandableComponent } from '../components/expandable/expandable.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  deger: Donee = { adi: null, grubu: null, il: null, tel: null, aciklama: null, tarih: null, olusturma: null };
  public kayitlar: any;
  userID: string;
  userName: string;

  constructor(public alertController: AlertController, public firestoreService: FirestoreService,
              private angularFireAuth: AngularFireAuth, private router: Router, public firebaseauthService: FirebaseauthService) {
    this.firestoreService.kayitlariOku('olusturma', 'desc').subscribe(sonuc => {
      this.kayitlar = sonuc; console.log(this.kayitlar);
    }, err => {
      console.log(err);
    });

    this.angularFireAuth.authState.subscribe(kullanici => {
      if (kullanici) {
        this.userID = kullanici.uid;
        this.userName = kullanici.displayName;
        console.log(this.userID);
      }
      else {
        this.router.navigateByUrl('welcome');
      }

    });
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.kayitSil(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kan Ara!',
      inputs: [
        {
          name: 'grubu',
          type: 'text',
          placeholder: 'Kan Grubu',

        },
        {
          name: 'adi',
          type: 'text',

          placeholder: 'Hasta Adı'
        },
        {
          name: 'il',
          type: 'text',

          placeholder: 'Ankara'
        },
        {
          name: 'tel',
          type: 'number',

          placeholder: '5XX YYY ZZ TT',
          min: 10,
          max: 10
        },
        {
          name: 'tarih',
          type: 'date',

        },

        {
          name: 'aciklama',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Açıklama',


        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {

            this.deger.grubu = alertData.grubu;
            this.deger.adi = alertData.adi;
            this.deger.il = alertData.il;
            this.deger.tel = alertData.tel;
            this.deger.tarih = alertData.tarih;
            this.deger.aciklama = alertData.aciklama;
            this.yeniKayit();


          }
        }
      ]
    });

    await alert.present();
  }
  async kayitGuncelle(kayit) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Güncelle',
      inputs: [
        {
          name: 'grubu',
          type: 'text',
          value: kayit.payload.doc.data().grubu,
          placeholder: 'Kan Grubu',

        },
        {
          name: 'adi',
          type: 'text',
          value: kayit.payload.doc.data().adi,
          placeholder: 'Hasta Adı'
        },
        {
          name: 'il',
          type: 'text',
          value: kayit.payload.doc.data().ili,
          placeholder: 'Ankara'
        },
        {
          name: 'tel',
          type: 'number',
          value: kayit.payload.doc.data().tel,

          placeholder: '5XX YYY ZZ TT',
          min: 10,
          max: 10
        },
        {
          name: 'tarih',
          type: 'date',
          value: kayit.payload.doc.data().tarih,

        },

        {
          name: 'aciklama',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Açıklama',
          value: kayit.payload.doc.data().aciklama,


        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Güncelle',
          handler: (alertData) => {



            this.deger.grubu = alertData.grubu;
            this.deger.adi = alertData.adi;
            this.deger.il = alertData.il;
            this.deger.tel = alertData.tel;
            this.deger.tarih = alertData.tarih;
            this.deger.aciklama = alertData.aciklama;
            this.guncelle(kayit.payload.doc.id, this.deger);
            console.log(this.deger);


          }
        }
      ]
    });

    await alert.present();
  }
  yeniKayit() {
    this.deger.olusturma = Math.floor(Date.now() / 1000);


    this.firestoreService.yeniKayit(this.deger).then(sonuc => {


    }).catch(err => {
      console.log(err);
    });
  }
  guncelle(id, deger) {
    this.firestoreService.guncelle(id, deger);
  }
  kayitSil(id) {
    this.firestoreService.kayitSil(id, );
    console.log('kayıt silindi');

  }

   logout() {
    this.firebaseauthService.logout();


    }


}
