import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter();
  title: string = '';

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

  toggle () {
    this.menuToggle.emit();
  }

}
