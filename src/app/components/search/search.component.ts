import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public artists: any[] = [];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  search(value: string) {
    console.log(value);
    this.spotifyService.getArtist(value)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.artists = data;
        }
      );
  }
}
