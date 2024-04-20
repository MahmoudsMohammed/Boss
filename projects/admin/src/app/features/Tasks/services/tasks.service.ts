import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class tasksService {
  http: HttpClient;
  constructor() {
    this.http = inject(HttpClient);
  }
  getAllTasks() {
    this.http.get('https://manage-mkex.onrender.com/tasks/all-tasks').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addTask(data: FormData) {
    this.http
      .post('https://manage-mkex.onrender.com/tasks/add-task', data)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
