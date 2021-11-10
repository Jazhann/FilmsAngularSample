import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Constants } from '@shared/constants';
import { SpinnerService } from '@shared/services/spinner.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  CONST = Constants;
  spinnerStatus = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public spinnerService: SpinnerService
  ) { 
    this.spinnerService.status().subscribe( status => this.spinnerStatus = status);
  } 

  menuToggle() {
    this.sidenav.toggle();
  }

}
