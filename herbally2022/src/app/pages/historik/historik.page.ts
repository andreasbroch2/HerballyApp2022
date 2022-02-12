import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { add, format, parseISO } from 'date-fns';
import { da } from 'date-fns/locale';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-historik',
  templateUrl: './historik.page.html',
  styleUrls: ['./historik.page.scss'],
})
export class HistorikPage implements OnInit {
  orders=null;
  constructor(private authService: AuthService, private router: Router) {};
 
  ngOnInit(){
    this.authService.orders().subscribe(result => {
      console.log(result);
      this.orders = result;
    });
}
parseDate(isodate, days = 0){
  return format(add(parseISO(isodate), {
    days: days
  }), "EEE 'd.' d MMM", {locale: da});
}
}
