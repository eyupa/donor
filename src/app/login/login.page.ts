import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../firebaseauth.service';
import { User } from '../user.class';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData: User = new User();
  constructor(private router: Router, private firebaseauthService: FirebaseauthService) { }

  ngOnInit() {
  }
  async login() {
    const kullanici = await this.firebaseauthService.login(this.userData);
    if (kullanici) {
      this.router.navigateByUrl('/home');
    }
  }


}
