import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-job-cards',
  templateUrl: './job-cards.component.html',
  styles: [],
})
export class JobCardsComponent implements OnInit {
  @Input()
  job: any;
  ngOnInit() {}
}
