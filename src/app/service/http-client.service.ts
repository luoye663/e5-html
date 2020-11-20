import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
  }

  getConfig(): any {
    return this.http.get(this.configUrl);
  }

  get(url): any {
    return this.http.get(url);
  }
}
