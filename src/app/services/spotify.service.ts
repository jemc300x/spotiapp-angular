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

  searchArtist(name: string) {

    return this.getQuery(`search?q=${name}&type=artist&offset=0&limit=20`)
      .pipe(
        map(data => data['artists'].items)
      );
  }

  private getQuery(query: string) {
    const headers = new HttpHeaders({
      'Authorization':'Bearer BQCB9C0iEHeVIYFX64zebwilkCwL0KAn6O5gpQs9QgNHfKTHILVpSEbOhaIO_xQJ3aQQPLR_kzenWT4eo60'
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


}
