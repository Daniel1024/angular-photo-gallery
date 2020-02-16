import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
  id: string;
  photo: Photo;
  urlPhoto: string;

  constructor(
      private activeRoute: ActivatedRoute,
      private router: Router,
      private photoService: PhotoService
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params.id;
      this.photoService.getPhoto(this.id)
          .subscribe(
              res => {
                this.photo = res;
                this.urlPhoto = `http://localhost:4000/${this.photo.imagePath}`;
              },
              error => console.error(error)
          );
    });
  }

  deletePhoto(id: string): boolean {
    this.photoService.deletePhoto(id)
        .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['photos']);
            },
            error => console.error(error)
        );

    return false;
  }

}
