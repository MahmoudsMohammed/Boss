import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task, tasksDataTable } from '../model/task.interface';
import { environment } from '../../../../../environments/environment.development';
import { TranslateService } from '@ngx-translate/core';

interface tasksResponse {
  tasks: Task[];
  totalItems: number;
}

@Injectable()
export class tasksService {
  http: HttpClient;
  tasks = signal<tasksDataTable[]>([
    {
      id: '',
      image: '',
      title: '',
      user: '',
      deadline: '',
      status: '',
      description: '',
      userId: '',
    },
  ]);

  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.http = inject(HttpClient);
  }

  // get all tasks
  getAllTasks(filter?: {
    status: string;
    toDate: string;
    fromDate: string;
    userId: string;
    keyword: string;
  }) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        value !== '' && value !== null
          ? (params = params.append(key, value))
          : '';
      });
    }
    this.http
      .get<tasksResponse>(`${environment.baseAPI}tasks/all-tasks`, {
        params: params,
      })
      .subscribe((res) => {
        this.tasks.set(this.mappingResponse(res));
      });
  }

  // mapping response for all tasks to get needed data
  mappingResponse(res: tasksResponse) {
    return res.tasks.map((e) => {
      return {
        id: e._id,
        image: environment.baseAPI + e.image,
        title: e.title,
        user: e.userId.username,
        deadline: e.deadline,
        status: e.status,
        description: e.description,
        userId: e.userId._id,
      };
    });
  }

  // add task function
  addTask(data: FormData) {
    this.http
      .post<{ massage: string }>(`${environment.baseAPI}tasks/add-task`, data)
      .subscribe((res) => {
        this.getAllTasks();
        this.toastr.success(this.translateService.instant('toaster.addTask'));
      });
  }

  // delete task
  deleteTask(id: string) {
    this.http
      .delete(`${environment.baseAPI}tasks/delete-task/${id}`)
      .subscribe((res) => {
        this.getAllTasks();
        this.toastr.success(
          this.translateService.instant('toaster.deleteTask')
        );
      });
  }

  // update task
  updateTask(data: FormData, id: string) {
    this.http
      .put<{ massage: string }>(
        `${environment.baseAPI}tasks/edit-task/${id}`,
        data
      )
      .subscribe((res) => {
        this.getAllTasks();
        console.log(res);
        this.toastr.success(
          this.translateService.instant('toaster.updateTask')
        );
      });
  }
}
