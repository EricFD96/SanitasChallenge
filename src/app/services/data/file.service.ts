import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, WriteFileResult } from '@capacitor/filesystem';
import { documentType } from 'src/app/shared/constants/constants.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  public async writeFile(data: any, fileName: string, directory: string, extension: string): Promise<WriteFileResult> {
    try{
      return await Filesystem.writeFile({
        path: `${directory}${fileName}${extension}`,
        data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } catch (error){
      console.error('Error writting file');
      return Promise.reject(null);
    }
  }

  public createDirectory(directory: string): Promise<void> {
    return Filesystem.mkdir({
      path: `${directory}`,
      directory: Directory.Documents,
    });
  }

  public async checkIfDocumentExists(fileName: string, directory: string, documentType: documentType): Promise<boolean> {
    try {
      const file = await Filesystem.stat({
        path: `${directory}${fileName}`,
        directory: Directory.Documents,
      });
      return file.type === documentType;
    } catch (error: any) {
      // file not found error
      if (error?.code === 'ENOENT' || error?.message === 'Entry does not exist.') {
        return false;
      }
     return false;
    }
  }

  public async readFile(fileName: string, directory: string): Promise<any> {
    try {
      const data = await Filesystem.readFile({
        path: `${directory}${fileName}`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return data?.data;
    } catch (error) {
      console.error(`Error reading file ${fileName}`, error);
      return null;
    }
  }
}
