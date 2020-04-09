import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  public loading: boolean;
  public artists: any[] = [];
  public error: any = {title: '', message: '', class: 'danger'};

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  search(value: string) {
    console.log(value);
    if (value === '') { return; }
    this.loading = true;
    this.spotifyService.searchArtist(value)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.artists = data;
          this.loading = false;
        },
        err => {
          this.error.title = 'Error: ' + err.error.error.status;
          this.error.message = err.error.error.message;
          this.loading = false;
        }
      );
  }
}
