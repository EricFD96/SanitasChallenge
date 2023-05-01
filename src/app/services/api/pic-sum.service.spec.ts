import { TestBed } from '@angular/core/testing';
import { PicSumService } from './pic-sum.service';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from '../data/file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ImageInfo } from 'src/app/models/image.model';
import { picSumFileName, sanitasFolder, documentType } from 'src/app/shared/constants/constants.model';
import { dataToJSON } from 'src/app/shared/utils/utils';

describe('PicSumService', () => {
  let service: PicSumService;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FileService', ['checkIfDocumentExists', 'readFile', 'writeFile', 'createDirectory']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [{ provide: FileService, useValue: spy }],
    });

    service = TestBed.inject(PicSumService);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return images info from existing file', async () => {
    const expectedImagesInfo: ImageInfo[] = [
      { id: 1, image: 'http://localhost:3000/id/1/200/200', text: 'random text 1' },
      { id: 2, image: 'http://localhost:3000/id/2/200/200', text: 'random text 2' },
    ];
    const fileName = picSumFileName + '.json';
    fileServiceSpy.checkIfDocumentExists.and.returnValue(Promise.resolve(true));
    fileServiceSpy.readFile.and.returnValue(Promise.resolve(dataToJSON(expectedImagesInfo)));
    
    const result = await service.getImagesInfo();
    
    expect(result).toEqual(expectedImagesInfo);
    expect(fileServiceSpy.checkIfDocumentExists).toHaveBeenCalledWith(fileName, sanitasFolder, documentType.File);
    expect(fileServiceSpy.readFile).toHaveBeenCalledWith(fileName, sanitasFolder);
  });

  it('should generate images and return images info', async () => {
    const expectedImagesInfo: ImageInfo[] = [
      { id: 1, image: 'http://localhost:3000/id/1/200/200', text: 'random text 1' },
      { id: 2, image: 'http://localhost:3000/id/2/200/200', text: 'random text 2' },
    ];
    const fileName = picSumFileName + '.json';
    fileServiceSpy.checkIfDocumentExists.and.returnValue(Promise.resolve(false));
    fileServiceSpy.readFile.and.returnValue(Promise.resolve(dataToJSON(expectedImagesInfo)));
    fileServiceSpy.writeFile.and.returnValue(Promise.resolve({uri: ''}));
    spyOn(service, "generateImageInfos").and.returnValue(of(expectedImagesInfo));
    
    const result = await service.getImagesInfo();
    
    expect(result).toEqual(expectedImagesInfo);
    expect(fileServiceSpy.checkIfDocumentExists).toHaveBeenCalledWith(fileName, sanitasFolder, documentType.File);
    expect(fileServiceSpy.readFile).toHaveBeenCalledWith(fileName, sanitasFolder);
  });
});
