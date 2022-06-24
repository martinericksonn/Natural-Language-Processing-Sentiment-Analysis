import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService) {}
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  ngOnInit(): void {}
}
