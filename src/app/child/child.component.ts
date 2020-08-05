import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() id;
  public isLoaded;
  public res;
  public loadPromise;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.callAPI()
  }

  callAPI() {
    if (this.loadPromise) {
      return this.loadPromise;
    }
    this.loadPromise = new Promise((resolve, reject) => {
      this.http.get(`https://jsonplaceholder.typicode.com/todos/${this.id}`).toPromise().then((res) => {
        setTimeout(() => {
          resolve(res);
          this.res = res;
          this.isLoaded = true;
        }, this.id * 1000)
      }).catch((err)=> {
        resolve(err);
      })
    });
  }

}