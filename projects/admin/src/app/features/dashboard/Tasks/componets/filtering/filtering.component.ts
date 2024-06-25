import { user } from '../../../../../core/model/user.interface';
import { usersService } from './../../../../../core/services/users.service';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteringComponent  {
  users: user[];
  constructor(private usersService: usersService) {
    effect(() => {
      this.users = this.usersService.users();
    });
  }
}
