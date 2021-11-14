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
    private layoutService: LayoutService,
    private location: Location
  ) { }

  toggle () {
    this.menuToggle.emit();
  }

  back () {
    this.location.back();
  }

  showBackButton() {
    return this.layoutService.showBackButton();
  }

  showMenuButton() {
    return this.layoutService.showMenuButton();
  }

  getTitle() {
    return this.layoutService.getTitle();
  }

}
