import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public newReleases: any[] = [];

  constructor(private spotifyService: SpotifyService) { 
    this.spotifyService.getReleases()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.newReleases = data;
          console.log(this.newReleases);
        },
        err => console.log(err)
      );
  }

  ngOnInit(): void {
  }

}
