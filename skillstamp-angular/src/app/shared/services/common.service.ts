
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
 

  constructor(private http:HttpClient) { }

  post(url,data) { console.log('post servis runng',url,data);
  return this.http.post(url,data)
  .map((data) => data);
  }

  get(url) { console.log('get servis runng',url);
  return this.http.get(url)
  .map((data) => data);
  }

  put(urlwithId,data) { console.log('update servis runng',urlwithId);
  return this.http.put(urlwithId,data)
  .map((data) => data);
  }
}
