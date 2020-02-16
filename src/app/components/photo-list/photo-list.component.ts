import { Component, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
        .subscribe(
            res => {
              this.photos = res;
              console.log(res[0].description);
            },
            error => console.error(error)
        );
  }

  photoUrl(photo: Photo): string {
    return `http://localhost:4000/${photo.imagePath}`;
  }

  selecteCard(id: string) {
    this.router.navigate(['/photos', id]);
  }

}
