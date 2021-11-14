import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '@shared/constants';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  CONST = Constants;

  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant(this.CONST.PAGE_NOT_FOUND_TITLE))
  }

}
