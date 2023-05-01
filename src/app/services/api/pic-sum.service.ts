import { Injectable } from '@angular/core';
import { ImageInfo } from '../../models/image.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError, interval, map, range, throwError, toArray } from 'rxjs';
import { JSONtoData, dataToJSON, generateRandomText } from '../../shared/utils/utils';
import { documentType, imageConfig, sanitasFolder, maxImagesInfoRange, picSumFileName } from '../../shared/constants/constants.model';
import { FileService } from '../data/file.service';

@Injectable({
  providedIn: 'root',
})
export class PicSumService {
  constructor(private http: HttpClient, private fileService: FileService) {}

  private apiUrl = 'https://picsum.photos/';

  public async getImagesInfo(): Promise<ImageInfo[]> {
    const fileName = picSumFileName + '.json';
    const doesFileExist = await this.fileService.checkIfDocumentExists(fileName, sanitasFolder, documentType.File);
    if (!doesFileExist) {
      await this.generateJsonImages();
    }
    return JSONtoData(await this.fileService.readFile(fileName, sanitasFolder));
  }

  public generateImageInfos(maxImageRange = maxImagesInfoRange): Observable<ImageInfo[]> {
    return range(1, maxImageRange).pipe(
      map(
        (id) =>
          ({ id, image: `${this.apiUrl}id/${id}/${imageConfig.width}/${imageConfig.height}`, text: generateRandomText() } as ImageInfo)
      ),
      toArray()
    );
  }

  public getPicSumById(id: Number, width = imageConfig.width, height = imageConfig.height): Observable<Blob> {
    return this.http.get(`${this.apiUrl}id/${id}/${width}/${height}`, { responseType: 'blob' }).pipe(
      map((value) => value ?? null),
      catchError((error) => {
        console.error(`Error get pic sum: ${error.message}`);
        return throwError(error);
      })
    );
  }

  public async generateJsonImages(): Promise<void> {
    try {
      const imagesJson = dataToJSON(await this.generateImageInfos().toPromise());
      await this.fileService.writeFile(imagesJson, picSumFileName, sanitasFolder, '.json');
    } catch (error) {
      console.error(`Error on generate json of images`);
    }
  }
}
