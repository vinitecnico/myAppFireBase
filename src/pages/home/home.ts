import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private alert: AlertController, private platform: Platform, private fcm: FCM, private clipboard: Clipboard) {
    this.onNotification();
  }

  async onNotification() {
    try {
      await this.platform.ready();

      this.fcm.onNotification().subscribe((data: any) => {
        this.alert.create({ message: data.message }).present();
      }, (error) => {
        this.alert.create({ message: error }).present();
      });

      this.fcm.getToken().then((c) => {
        //this.alert.create({ message: c }).present();
        
        this.clipboard.paste().then(
          (resolve: string) => { this.clipboard.copy(c); alert(c); }, (reject: string) => { alert('Error: ' + reject); } );
        }, (error) => {
          this.alert.create({ message: error }).present();
        });
    }
    catch (e) {
      this.alert.create({ message: e }).present();
    }
  }

}
