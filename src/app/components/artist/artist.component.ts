import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {
  public loading: boolean;
  public artist: any = {};
  public topTracks: any[] = [];
  public error: any = {title: '', message: '', class: 'danger'};

  constructor(
    private activateRouter: ActivatedRoute,
    private spotifyService: SpotifyService
    ) {
    activateRouter.params.subscribe(
      param => this.getArtist(param['id'])
    );
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotifyService.getArtist(id)
      .subscribe( 
        artist => {
          this.artist = artist;
          this.getTopTracks(id);
          this.loading = false;
        },
        err => {
          this.error.title = 'Error: ' + err.error.error.status;
          this.error.message = err.error.error.message;
          this.loading = false;
        }
      );
  }

  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id)
      .subscribe(
        tracks => this.topTracks = tracks,
        err => {
          this.error.title = 'Error: ' + err.error.error.status;
          this.error.message = err.error.error.message;
          this.loading = false;
        }
      );
  }

}
