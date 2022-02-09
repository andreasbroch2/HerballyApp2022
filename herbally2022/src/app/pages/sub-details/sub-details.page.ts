import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, NgModule } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { format, parseISO, add } from "date-fns";
import { da } from "date-fns/locale";

@Component({
  selector: "app-sub-details",
  templateUrl: "./sub-details.page.html",
  styleUrls: ["./sub-details.page.scss"],
})
export class SubDetailsPage implements OnInit {
  id = this.activatedRoute.snapshot.paramMap.get("id");
  details = null;
  date = new Date();
  response = null;
  total = null;
  load = "";
  noticeopen = true;
  sundays = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public alertController: AlertController,
    public modalController: ModalController,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  parseDate(isodate, days) {
    return format(
      add(parseISO(isodate), {
        days: days,
      }),
      "EEE 'd.' d MMM",
      { locale: da }
    );
  }
  addNumbers(number1, number2) {
    const result: number = Number(number1) + Number(number2);
    return result;
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.authService.subdetails(id).subscribe((result) => {
      console.log(result);
      this.details = result;
      this.date = this.details.schedule_next_payment.date;
      this.date = this.addDays(this.date, 4);
    });
    var sunday = new Date();
    sunday.setDate(sunday.getDate() + 4);
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
    for (var i = 0; i < 6; i++) {
      this.sundays.push(new Date(sunday.getTime()));
      sunday.setDate(sunday.getDate() + 7);
    }
  }

  async presentModal(
    componentstring,
    prop1 = null,
    prop2 = null,
    prop3 = null
  ) {
    var component = null;
    var initial = 0.5;
    var breakpoints = [0, 0.5];
    var componentProps = {};
    const modal = await this.modalController.create({
      component: component,
      componentProps: componentProps,
      initialBreakpoint: initial,
      breakpoints: breakpoints,
    });
    await modal.present();

    const eventDetails = await modal.onDidDismiss();

    if (eventDetails) {
      console.log(eventDetails.data);
      if (eventDetails.data) this.details = eventDetails.data;
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    return toast.present();
  }
  removeCoupon(coupon) {
    if (confirm("Er du sikker på at du vil fjerne denne rabatkode?")) {
      this.presentLoading();
      this.authService.removeCoupon(this.id, coupon).subscribe((result) => {
        this.details = result;
        this.loadingController.dismiss();
        this.presentToast("Rabatkode fjernet!");
      });
    }
  }
  async frek() {
    if (this.details.billing_interval === "1") {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver anden uge",
            handler: () => {
              this.frekvens(2);
            },
          },
          {
            text: "Hver tredje uge",
            handler: () => {
              this.frekvens(3);
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frekvens(4);
            },
          },
        ],
      });
      await alert.present();
    } else if (this.details.billing_interval === "2") {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver uge",
            handler: () => {
              this.frekvens(1);
            },
          },
          {
            text: "Hver tredje uge",
            handler: () => {
              this.frekvens(3);
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frekvens(4);
            },
          },
        ],
      });
      await alert.present();
    } else if (this.details.billing_interval === "3") {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver uge",
            handler: () => {
              this.frekvens(1);
            },
          },
          {
            text: "Hver anden uge",
            handler: () => {
              this.frekvens(2);
            },
          },
          {
            text: "Hver fjerde uge",
            handler: () => {
              this.frekvens(4);
            },
          },
        ],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Vælg Frekvens",
        message: "Hvor ofte vil du have leveret",
        buttons: [
          {
            text: "Hver uge",
            handler: () => {
              this.frekvens(1);
            },
          },
          {
            text: "Hver anden uge",
            handler: () => {
              this.frekvens(2);
            },
          },
          {
            text: "Hver tredje uge",
            handler: () => {
              this.frekvens(3);
            },
          },
        ],
      });
      await alert.present();
    }
  }
  frekvens(value) {
    this.presentLoading();
    this.authService.frekvens(this.id, value).subscribe((result) => {
      this.details = result;
      this.loadingController.dismiss();

      this.presentToast("Leveringsfrekvens ændret!");
    });
  }
  async pause() {
    const alert = await this.alertController.create({
      cssClass: "sikker",
      header: "Er du sikker?",
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Yes!",
          handler: () => {
            this.presentLoading();
            if (this.details.status === "active") {
              this.authService
                .status(this.id, "on-hold")
                .subscribe((result) => {
                  this.details = result;
                  this.loadingController.dismiss();
                  this.presentToast("Måltidskasse sat på pause!");
                });
            } else if (this.details.status === "on-hold") {
              this.authService.status(this.id, "active").subscribe((result) => {
                this.details = result;
                this.loadingController.dismiss();
                this.presentToast("Måltidskasse aktiveret!");
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }
  async coupon() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Tilføj rabatkode",
      inputs: [
        {
          name: "coupon",
          placeholder: "Rabatkode",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Bekræft",
          handler: (data) => {
            this.presentLoading();
            this.authService
              .coupon(this.id, data.coupon)
              .subscribe((result) => {
                this.details = result;
                this.loadingController.dismiss();
                this.presentToast("Rabatkode tilføjet!");
              });
          },
        },
      ],
    });

    await alert.present();
  }
  async afmeld() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Afmelding",
      subHeader:
        "Vi vil sætte stor pris hvis du vil fortælle os hvorfor du ønsker at afmelde, så vi kan forbedre os!",
      inputs: [
        {
          name: "reason",
          placeholder: "Årsag",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Bekræft",
          handler: (data) => {
            if (this.details.status != "cancelled") {
              this.presentLoading();
              this.authService.status(this.id, "cancelled").subscribe((result) => {
                this.details = result;
                this.authService
                  .cancelReason(this.details.customer_id, data.reason)
                  .subscribe((result) => {});
                  this.loadingController.dismiss();
                this.presentToast("Måltidskasse afmeldt!");
                this.router.navigate(["/"]);
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async note() {
    const alert = await this.alertController.create({
      cssClass: "notealert",
      header: "Leveringsnote",
      inputs: [
        {
          name: "note",
          type: "textarea",
          placeholder:
            "Fortæl os hvis der er noget vi skal tage højde for ved levering(dørkode, sted mm.). Vi forsøger altid at sætte kassen ved fordøren, og alternativt et passende sted i læ.",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Bekræft",
          handler: (value) => {
            this.presentLoading();
            this.authService
              .addNote(this.id, value.note)
              .subscribe((result) => {
                this.details = result;
                this.loadingController.dismiss();
              });
          },
        },
      ],
    });
    await alert.present();
  }
  async adresse() {
    const alert = await this.alertController.create({
      cssClass: "adressealert",
      header: "Leveringsadresse",
      inputs: [
        {
          name: "first_name",
          type: "text",
          placeholder: "Fornavn",
        },
        {
          name: "last_name",
          type: "text",
          placeholder: "Efternavn",
        },
        {
          name: "address_1",
          type: "text",
          placeholder: "Vejnavn og nr.",
        },
        {
          name: "address_2",
          type: "text",
          placeholder: "Etage, dør, mm.",
        },
        {
          name: "postcode",
          type: "text",
          placeholder: "Postnummer",
        },
        {
          name: "city",
          type: "text",
          placeholder: "By",
        },
      ],
      buttons: [
        {
          text: "Fortryd",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Bekræft",
          handler: (value) => {
            this.presentLoading();
            let id = this.activatedRoute.snapshot.paramMap.get("id");
            this.authService.addAdresse(id, value).subscribe((result) => {
              this.details = result;
              this.loadingController.dismiss();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  hidden = true;
  showContent() {
    if (this.hidden) {
      document.getElementById("leveringscontent").style.display = "block";
      this.hidden = false;
    } else {
      document.getElementById("leveringscontent").style.display = "none";
      this.hidden = true;
    }
  }
  hiddenkasse = true;
  showContentKasse() {
    if (this.hiddenkasse) {
      document.getElementById("kassecontent").style.display = "block";
      this.hiddenkasse = false;
    } else {
      document.getElementById("kassecontent").style.display = "none";
      this.hiddenkasse = true;
    }
  }
  hiddenbetaling = true;
  showContentBetaling() {
    if (this.hiddenbetaling) {
      document.getElementById("betalingcontent").style.display = "block";
      this.hiddenbetaling = false;
    } else {
      document.getElementById("betalingcontent").style.display = "none";
      this.hiddenbetaling = true;
    }
  }
}
