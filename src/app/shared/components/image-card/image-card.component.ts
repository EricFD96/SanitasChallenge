import { Component, Input, OnInit } from '@angular/core';
import { ImageInfo } from 'src/app/models/image.model';

@Component({
  selector: 'san-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() image!: ImageInfo;
  constructor() {}

  ngOnInit() {}
}
