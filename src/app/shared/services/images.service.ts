import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(
    private http: HttpClient
  ) {}

  uploadImage(imagePath): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', this.dataURItoBlob(imagePath.dataUrl), 'image.jpg');

    return this.http.post<any>(`${environment.baseApiUrl}/images/upload`, formData);
  }

  dataURItoBlob(dataURI) {
    try {
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = unescape(dataURI.split(',')[1]);
      }
  
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: mimeString });
      return blob;
    } catch (error) {
      console.log('catch ', error);
    }
  }
}