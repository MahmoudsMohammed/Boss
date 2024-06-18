import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteringComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
