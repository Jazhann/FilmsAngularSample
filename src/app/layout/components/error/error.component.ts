import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '@shared/constants';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  CONST = Constants;

  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant(this.CONST.ERROR_TITLE))
  }
}
