import { user } from '../../../../../core/model/user.interface';
import { tasksService } from '../../services/tasks.service';
import { usersService } from './../../../../../core/services/users.service';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteringComponent {
  users: user[];
  filter: {
    status: string;
    toDate: string;
    fromDate: string;
    userId: string;
    keyword: string;
  } = {
    status: '',
    toDate: '',
    fromDate: '',
    userId: '',
    keyword: '',
  };
  constructor(
    private usersService: usersService,
    private taskService: tasksService
  ) {
    effect(() => {
      this.users = this.usersService.users();
    });
  }

  onChange(e: any, type: string) {
    switch (type) {
      case 'keyword':
        this.filter.keyword = e.target.value;
        break;
      case 'fromDate':
        this.filter[type] = e.value.toLocaleDateString('en-GB');
        break;
      case 'toDate':
        e.value
          ? (this.filter[type] = e.value.toLocaleDateString('en-GB'))
          : (this.filter[type] = '');
        break;
      default:
        this.filter[type] = e;
        break;
    }
    this.taskService.getAllTasks(this.filter);
  }
}
