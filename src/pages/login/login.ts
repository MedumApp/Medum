import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AuthProviders, AuthMethods,FirebaseAuth} from 'angularfire2';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loader: any;
  user = {email: '', password: ''};
  constructor(public nav: NavController, /*public auth: FirebaseAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController*/) {}

  


}