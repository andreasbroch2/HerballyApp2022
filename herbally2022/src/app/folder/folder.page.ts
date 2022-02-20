import { AuthService } from '../services/auth.service';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { add, format, parseISO } from "date-fns";
import { da } from "date-fns/locale";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  information = null;
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth();
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    })
    LocalNotifications.requestPermissions()
  }
  parseDate(isodate, days = 0){
    return format(add(parseISO(isodate), {
      days: days
    }), "EEE 'd.' d MMM", {locale: da});
  }
  auth() {
    this.authService.subscription().subscribe((result) => {
      localStorage.setItem('subscriptions', JSON.stringify(result));
      this.information = result;
      console.log(this.information);
    });
  }
  console() {
    console.log(this.information);
  }
  logout() {
    this.authService.logout();
  }
}
