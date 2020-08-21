import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angularSPA';
  hideSmall: Boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log(window.screen.width);
    if (window.screen.width < 760) {
      // 768px portrait
      this.hideSmall = false;
      console.log(this.hideSmall);
    } else {
      this.hideSmall = true;
    }
  }
  landingpage() {
    this.router.navigateByUrl('landing-page');
  }
  placeAppointment() {
    this.router.navigateByUrl('place-fitness-trainer-appointment');
  }
  viewAppointment() {
    this.router.navigateByUrl('view-appointment');
  }
  contactUspage() {
    this.router.navigateByUrl('contact-us');
  }
}
