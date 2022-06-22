import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  loading = false;
  submitted = false;

  constructor() {
    // redirect to home if already logged in
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid

    this.loading = true;
  }
}
