import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  kayitlar: any;
  constructor(public firestoreService: FirestoreService) {
    this.firestoreService.kayitlariOku('olusturma', 'desc').subscribe(sonuc => {
      this.kayitlar = sonuc; console.log(this.kayitlar);

    }, ); }
  ngOnInit() { }
}
