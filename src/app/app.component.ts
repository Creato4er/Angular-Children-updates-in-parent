import { Component, VERSION, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  items = [1,2,3,4,5];

  @ViewChildren(ChildComponent)
	child: QueryList<ChildComponent>;

  generatePromise() {
    this.getChildAPIDetails().then(() => {
      console.log('Your download started');
    })
    // this.getResponseFromChild().then(() => {
    //   console.log('Your download started');
    // })
  }



  getChildAPIDetails() {
    return new Promise((resolve, reject) => {
      let loadPromises = [];
      this.child.forEach((item: any) => {
        loadPromises.push(item.callAPI());
      });
      Promise.all(loadPromises).then((res) => {
        console.log(res);
        resolve();
      })
    });
  }

  getResponseFromChild() {
    return Promise.resolve();
  }
}
