import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service"
import { ModalController, LoadingController } from "@ionic/angular"

@Component({
  selector: "app-changedate",
  templateUrl: "./changedate.component.html",
  styleUrls: ["./changedate.component.scss"],
})
export class ChangedateComponent implements OnInit {
  sundays = [];
  constructor(
    private authService: AuthService, 
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}
  saveddate = "";
  saveDate(date) {
    this.saveddate = date;
  }
  @Input() subid: number;
  ngOnInit() {
    var sunday = new Date();
    sunday.setDate(sunday.getDate() + 4);
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
    for (var i = 0; i < 6; i++) {
      this.sundays.push(new Date(sunday.getTime()));
      sunday.setDate(sunday.getDate() + 7);
    }
  }
  changeDate(weeks) {
    this.presentLoading();
    this.authService.changeDate(weeks, this.subid).subscribe((result) => {
      this.modalController.dismiss(result);
      this.loadingController.dismiss();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Arbejder...",
      translucent: true,
    });
    return await loading.present();
  }
}
