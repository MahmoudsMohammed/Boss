import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  effect,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tasksService } from '../../services/tasks.service';
import { tasksDataTable } from '../../model/task.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() updateData = new EventEmitter<tasksDataTable>();
  dataSource = new MatTableDataSource<tasksDataTable>();

  constructor(private taskServ: tasksService) {
    effect(() => {
      console.log(this.taskServ.tasks());
      this.dataSource.data = this.taskServ.tasks();
    });
  }

  ngOnInit(): void {
    this.taskServ.getAllTasks();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'image',
    'title',
    'user',
    'deadline',
    'status',
    'control',
  ];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // delete task
  deleteTask(id: string) {
    this.taskServ.deleteTask(id);
  }
}
