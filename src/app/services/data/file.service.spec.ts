import { TestBed } from '@angular/core/testing';
import { documentType } from 'src/app/shared/constants/constants.model';
import { FileService } from './file.service';
import { Directory, Encoding, Filesystem, WriteFileResult } from '@capacitor/filesystem';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should write file', async () => {
    const resultFile = { uri: '/DOCUMENTS/directory/test.txt' } as WriteFileResult;
    const spy = spyOn(Filesystem, 'writeFile').and.returnValue(Promise.resolve(resultFile));
    const result = await service.writeFile('data', 'test', 'directory/', '.txt');
    
    expect(result).toEqual(resultFile);
  });
});
