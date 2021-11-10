import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Constants } from '@shared/constants';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  CONST = Constants;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() { }

  menuToggle() {
    this.sidenav.toggle();
  }

}
