import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {Router} from '@angular/router';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-konto',
  templateUrl: './konto.page.html',
  styleUrls: ['./konto.page.scss'],
})
export class KontoPage implements OnInit {
  kunde=null;
  customer=null; 
  toggleStatus: any;
  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {};
 
  async ngOnInit(){
    this.authService.kunde().subscribe(result => {
      console.log(result[0]);
      this.customer = result[0]; 
      this.authService.customer(this.customer.id).subscribe(result => {
        console.log(result);
        this.kunde = result;
      })
    });
}
async ionViewWillEnter(){
  const { value } = await Storage.get({ key: 'notifications' });
  if(value){
  this.toggleStatus = true;
    }
}
logout(){
  this.authService.logout();
  this.router.navigate(['/'])
}
async kundeAdresse(id){
  const alert = await this.alertController.create({
    cssClass: 'adressealert',
    header: 'Kontoadresse',
    inputs: [
      {
        name: 'first_name',
        type: 'text',
        placeholder: 'Fornavn'
      },
      {
        name: 'last_name',
        type: 'text',
        placeholder: 'Efternavn'
      },
      {
        name: 'address_1',
        type: 'text',
        placeholder: 'Vejnavn og nr.'
      },
      {
        name: 'address_2',
        type: 'text',
        placeholder: 'Etage, dør, mm.'
      },
      {
        name: 'postcode',
        type: 'text',
        placeholder: 'Postnummer'
      },
      {
        name: 'city',
        type: 'text',
        placeholder: 'By'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          console.log(value);
          this.authService.addKundeAdresse(id, value).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
        })
      }
}]
});
  await alert.present();
}
async kundeTelefon(id){
  const alert = await this.alertController.create({
    cssClass: 'telefonalert',
    header: 'Telefonnummer',
    inputs: [
      {
        name: 'phone',
        type: 'number',
        placeholder: 'Telefon'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          console.log(value);
          this.authService.addKundeTelefon(id, value.phone).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
        })
      }
}]
});
  await alert.present();
}
async kundeEmail(id){
  const alert = await this.alertController.create({
    cssClass: 'emailealert',
    header: 'Email',
    inputs: [
      {
        name: 'email',
        type: 'text',
        placeholder: 'Email'
      },
  ],
    buttons: [
      {
        text: 'Fortryd',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Bekræft',
        handler: (value) => {
          console.log(value.email);
          this.authService.addKundeEmail(id, value.email).subscribe(result => {
            this.kunde = result;
            console.log(this.kunde);
        })
      }
}]
});
  await alert.present();
}
}