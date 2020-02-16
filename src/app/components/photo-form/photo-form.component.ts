import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { HtmlInputEvent } from '../../interfaces/HtmlInputEvent';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;

  constructor(private photoService: PhotoService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      // Image Preview
      const reader = new FileReader();
      reader.onload = _ => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService
        .createPhoto(title.value, description.value, this.file)
        .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/photos']);
            },
            err => console.error(err)
        );

    return false;
  }
}
