import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/photo';
import { HtmlInputEvent } from '../../interfaces/HtmlInputEvent';

@Component({
    selector: 'app-photo-preview',
    templateUrl: './photo-preview.component.html',
    styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
    id: string;
    photo: Photo;
    file: File;
    photoSelected: string | ArrayBuffer;

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
                        this.photoSelected = `http://localhost:4000/${this.photo.imagePath}`;
                    },
                    error => console.error(error)
                );
        });
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

    updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
        this.photoService.updatePhoto(this.id, title.value, description.value, this.file)
            .subscribe(
                res => console.log(res),
                err => console.error(err)
            );
        return false;
    }

}
