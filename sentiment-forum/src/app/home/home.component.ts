import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Post } from '../shared/services/post';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  postiveWords: string[] = [];
  negativeWords: string[] = [];
  title = 'sentiment-forum';
  currentUser?: User;
  posts?: Post[];
  sentimentText = '';
  sentimentScore = '';

  getUser(uid: string): Observable<User[]> {
    const o = this.db
      .collection<User>('user', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
    return o;
  }

  getAllPost(): Observable<Post[]> {
    return this.db.collection<Post>('post').valueChanges();
  }

  ngOnInit() {
    var tempNegative: string[] = [];
    var tempPostive: string[] = [];

    this.getUser(this.authService.userUID!).subscribe((data) => {
      this.currentUser = data[0];
    });
    this.getAllPost().subscribe((data) => {
      this.posts = data;
    });
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

  formText(text: string, title: string) {
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

    this.sentimentText = this.sentiFeel(sentiCalc);
    this.sentimentScore = sentiCalc.toFixed(2);

    this.addForum({
      title: title,
      body: text,
      username: this.currentUser?.username,
      sentiment_text: this.sentimentText,
      sentiment_value: this.sentimentScore,
    });
  }

  sentiFeel(value: number) {
    if (value > 20) return 'Positve';
    else if (value > 5) return 'Somewhat Positve';
    else if (value >= 0) return 'Neutral';
    else if (value > -5) return 'Somewhat Negative';
    else if (value <= -10) return 'Negative';
    else return '';
  }

  addForum(post: Post) {
    try {
      this.db.collection('post').add(post);
      return true;
    } catch (error) {
      console.log(error);
    }
    console.log(post);
    return;
  }
}

//Not added
