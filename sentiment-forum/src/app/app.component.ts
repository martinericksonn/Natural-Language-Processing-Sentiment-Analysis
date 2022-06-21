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
    var newText = text.replace(/[^a-zA-Z ]/g, '');
    tokens = newText.split(' ');

    var pos: number = 0.0;
    var neg: number = 0.0;

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
    console.log(pos - neg);

    console.log(tokens.length);
    var sentiCalc = ((pos - neg) / tokens.length) * 100;
    console.log();

    console.log(sentiCalc.toFixed(2));
    console.log(this.sentiFeel(sentiCalc));
  }

  sentiFeel(value: number) {
    if (value > 20) return 'Positve';
    else if (value > 5) return 'Somewhat Positve';
    else if (value >= 0) return 'Neutral';
    else if (value > -5) return 'Somewhat Negative';
    else if (value <= -10) return 'Negative';
    else return '';
  }
}
