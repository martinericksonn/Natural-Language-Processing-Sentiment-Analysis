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

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;

    this.loading = true;
  }
}
