import { Injectable } from '@angular/core';
import {Http, Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SearchService {

  constructor(private http:Http) { }

  getSearchHint(query:string){
    let headers=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:headers});

    let body={
      "query":{"match_phrase_prefix":{"address":query}},
      "size":6,
      "sort":{"_score":"asc"}
    }
    return this.http
    .post('http://localhost:9200/bank/account/_search?',body,options).map((res:Response)=>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getExactMatches(query:string){
    let headers=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:headers});

    let body={
      "query":{"match_phrase_prefix":{"address":query}},
      "size":1000,
      "sort":{"_score":"desc"}
    }

    return this.http
    .post('http://localhost:9200/bank/account/_search?',body,options).map((res:Response)=>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getFoods() {
    return this.http.get('/app/food.json').map((res:Response) => res.json());
  }
  createFood(food) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(food);
    return this.http.post('/api/food/', body, options ).map((res: Response) => res.json());
  }
  // updateFood(food) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   let body = JSON.stringify(food);
  //   return this.http.put('/api/food/' + food_id, body, options ).map((res: Response) => res.json());
  // }
}
