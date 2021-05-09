import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../firebaseauth.service';
import { User } from '../user.class';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData: User = new User();
  constructor(
    private firebaseauthService: FirebaseauthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async sign() {
    const kullanici = await this.firebaseauthService.signup(this.userData);
    if (kullanici) {
      console.log('Kullanıcı oluşturuldu');
      this.router.navigateByUrl('/home');
    }
  }

}
