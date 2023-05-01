import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FileService } from './services/data/file.service';
import { documentType, sanitasFolder } from './shared/constants/constants.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private fileService: FileService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const doesFileExist = await this.fileService.checkIfDocumentExists('', sanitasFolder, documentType.Directory);
      if (!doesFileExist) {
        await this.fileService.createDirectory(sanitasFolder);
      }
    });
  }
}
