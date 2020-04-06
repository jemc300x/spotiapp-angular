import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(
        map(data => data['albums'].items)
      );
  }

  getArtist(name: string) {

    return this.getQuery(`search?q=${name}&type=artist&offset=0&limit=20`)
      .pipe(
        map(data => data['artists'].items)
      );
  }

  private getQuery(query: string) {
    const headers = new HttpHeaders({
      'Authorization':'Bearer BQC7XMPJ7yacMvAjDkaKwUsXJTgXKQ_YWLNmC-XfSYT09so_XLf7zd9XSzitZnEJsmv7EmFBFdv6TscHfGs'
    });

    const url = `https://api.spotify.com/v1/${query}`;

    return this.http.get(url, {headers});
  }


}
