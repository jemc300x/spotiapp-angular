import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  public newReleases: any[] = [];
  public loading: boolean;
  public error: any = {title: '', message: '', class: 'danger'};

  constructor(private spotifyService: SpotifyService) {
    this.getReleases();
  }

  getReleases() {
    this.loading = true;
    this.spotifyService.getReleases()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.newReleases = data;
          console.log(this.newReleases);
          this.loading = false;
          this.error = {};
        },
        err => {
          this.error.title = 'Error: ' + err.error.error.status;
          this.error.message = err.error.error.message;
          this.loading = false;
          this.spotifyService.getToken()
            .then( () => this.getReleases());
        }
      );
  }

}
