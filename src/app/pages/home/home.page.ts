import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, from, map, of, startWith } from 'rxjs';
import { ImageInfo } from '../../models/image.model';
import { PicSumService } from '../../services/api/pic-sum.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public searchField: FormControl;
  public imagesInfo$!: Observable<ImageInfo[]>;

  constructor(private picSumService: PicSumService) {
    this.searchField = new FormControl('');
  }

  ionViewWillEnter(): void {
    this.getPics();
    const searchTerm$: Observable<string> = this.searchField.valueChanges.pipe(startWith(this.searchField.value));
    this.imagesInfo$ = combineLatest([this.imagesInfo$, searchTerm$]).pipe(
      map(([images, searchTerm]) =>
        images?.filter(
          (image) =>
            searchTerm === '' ||
            image.id?.toString().toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            image.text?.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      )
    );
  }

  private getPics(): void {
    this.imagesInfo$ = from(this.picSumService.getImagesInfo());
  }
}
