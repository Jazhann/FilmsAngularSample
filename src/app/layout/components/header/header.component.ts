import { Location } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter();

  constructor(
    public layoutService: LayoutService,
    private location: Location
  ) { }

  toggle () {
    this.menuToggle.emit();
  }

  back () {
    this.location.back();
  }

}
