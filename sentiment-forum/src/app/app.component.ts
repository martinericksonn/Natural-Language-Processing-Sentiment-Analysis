import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sentiment-forum';

  formText(text: string) {
    console.log(text.split(' '));
  }
}
