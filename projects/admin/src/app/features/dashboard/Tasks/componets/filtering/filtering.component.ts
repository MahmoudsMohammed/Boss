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
  deponesTime;
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
    // store each filter value based on type
    switch (type) {
      case 'keyword':
        // clear the old time out
        clearTimeout(this.deponesTime);
        // start new one
        this.deponesTime = setTimeout(() => {
          this.filter.keyword = e.target.value;
          this.taskService.getAllTasks(this.filter);
        }, 2000);
        break;
      case 'fromDate':
        this.filter[type] = String(
          e.value.toLocaleDateString('en-GB')
        ).replaceAll('/', '-');
        this.filter.toDate = '';
        break;
      case 'toDate':
        e.value
          ? (this.filter[type] = String(
              e.value.toLocaleDateString('en-GB')
            ).replaceAll('/', '-'))
          : (this.filter[type] = '');
        break;
      default:
        this.filter[type] = e;
        break;
    }

    // for other filter requests
    if (type !== 'keyword') {
      if (
        (this.filter.toDate === '' && this.filter.fromDate === '') ||
        this.filter.toDate !== ''
      ) {
        this.taskService.getAllTasks(this.filter);
      }
    }
  }
}
