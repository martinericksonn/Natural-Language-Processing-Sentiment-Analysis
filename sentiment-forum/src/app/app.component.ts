import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  postiveWords: string[] = [];
  negativeWords: string[] = [];
  title = 'sentiment-forum';

  ngOnInit() {
    var tempNegative: string[] = [];
    var tempPostive: string[] = [];

    this.http
      .get('assets/positive-words.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        console.log(data.length);

        tempPostive.push(data);
        this.postiveWords = tempPostive[0].split('\n');
      });

    this.http
      .get('assets/negative-words.txt', {
        responseType: 'text',
      })
      .subscribe((data) => {
        console.log(data.length);

        tempNegative.push(data);
        this.negativeWords = tempNegative[0].split('\n');
      });
  }

  formText(text: string) {
    var tokens = [];
    tokens = text.split(' ');

    var pos = 0;
    var neg = 0;

    var tokenPos: string[] = [];
    var tokenNav: string[] = [];

    console.log(tokens.length);

    tokens.forEach((token) => {
      if (this.postiveWords.includes(token)) {
        tokenPos.push(token);
        pos++;
      } else if (this.negativeWords.includes(token)) {
        tokenNav.push(token);
        neg++;
      }
    });
    console.log(tokenPos);
    console.log(tokenNav);
    console.log(pos + ' ' + neg);
  }
}
