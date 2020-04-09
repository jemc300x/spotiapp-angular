import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token = 'BQCB9C0iEHeVIYFX64zebwilkCwL0KAn6O5gpQs9QgNHfKTHILVpSEbOhaIO_xQJ3aQQPLR_kzenWT4eo60';

  constructor(private http: HttpClient) { }

  getReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(
        map(data => data['albums'].items)
      );
  }

  searchArtist(name: string) {

    return this.getQuery(`search?q=${name}&type=artist&offset=0&limit=20`)
      .pipe(
        map(data => data['artists'].items)
      );
  }

  private getQuery(query: string) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });

    const url = `https://api.spotify.com/v1/${query}`;

    return this.http.get(url, {headers});
  }

  getArtist(artistId: string) {
    return this.getQuery(`artists/${artistId}`);
  }

  getTopTracks(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?country=us`)
                .pipe(map(data => data['tracks']));
  }

  getToken(): Promise<boolean> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'ccadfd28490d41b587fe2a52d59fc948')
      .set('client_secret', '42c84e48b2964c1c94a77fdc44f54ba6');

    return new Promise((resolve, reject) => {
      this.http.post('https://accounts.spotify.com/api/token', body.toString(), {headers})
        .subscribe(
          (data: any) => {
            this.token =  data.access_token;
            resolve(true);
          },
          () => reject(false)
        );
    });
  }

}
