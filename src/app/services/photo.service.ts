import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private url = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    return this.http.post(`${this.url}/photo`, fd);
  }
}
