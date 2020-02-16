import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private url = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {
  }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    return this.http.post(`${this.url}/photo`, fd);
  }

  getPhotos() {
    return this.http.get<Photo[]>(`${this.url}/photos`);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.url}/photo/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.url}/photo/${id}`);
  }

  updatePhoto(id: string, title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.put(`${this.url}/photo/${id}`, fd);
  }

}
