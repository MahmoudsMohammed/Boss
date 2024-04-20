import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Task, tasksDataTable } from '../model/task.interface';

interface tasksResponse {
  tasks: Task[];
  totalItems: number;
}

@Injectable()
export class tasksService {
  http: HttpClient;
  tasks = signal<tasksDataTable[]>([
    {
      Image: '',
      Title: '',
      User: '',
      DeadLine: '',
      Status: '',
    },
  ]);

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.http = inject(HttpClient);
  }

  // get all tasks
  getAllTasks() {
    this.spinner.show();
    this.http
      .get<tasksResponse>('https://manage-mkex.onrender.com/tasks/all-tasks')
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.tasks.set(this.mappingResponse(res));
          console.log(res);
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err);
        }
      );
  }

  // mapping response for all tasks to get needed data
  mappingResponse(res: tasksResponse) {
    return res.tasks.map((e) => {
      return {
        Image: 'https://manage-mkex.onrender.com/' + e.image,
        Title: e.title,
        User: e.userId.username,
        DeadLine: e.deadline,
        Status: e.status,
      };
    });
  }

  // add task function
  addTask(data: FormData) {
    this.spinner.show();
    this.http
      .post<{ massage: string }>(
        'https://manage-mkex.onrender.com/tasks/add-task',
        data
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toastr.success(res.massage);
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err);
        }
      );
  }
}
