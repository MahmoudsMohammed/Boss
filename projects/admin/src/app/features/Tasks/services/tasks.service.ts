import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Task, tasksDataTable } from '../model/task.interface';
import { environment } from '../../../../environments/environment.development';
import { finalize } from 'rxjs';

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
      .get<tasksResponse>(`${environment.baseAPI}tasks/all-tasks`)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((res) => {
        this.tasks.set(this.mappingResponse(res));
      });
  }

  // mapping response for all tasks to get needed data
  mappingResponse(res: tasksResponse) {
    return res.tasks.map((e) => {
      return {
        Image: environment.baseAPI + e.image,
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
      .post<{ massage: string }>(`${environment.baseAPI}tasks/add-task`, data)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((res) => {
        this.getAllTasks();
        this.toastr.success(res.massage);
      });
  }
}
