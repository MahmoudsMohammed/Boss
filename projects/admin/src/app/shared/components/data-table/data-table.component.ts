import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface userData {
  No: number;
  Title: string;
  User: string;
  DeadLine: string;
  Status: string;
}

const ELEMENT_DATA: userData[] = [
  {
    No: 1,
    Title: 'mahmoud',
    User: 'mahmoud',
    DeadLine: '2-12-2024',
    Status: 'completed',
  },
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<userData>(ELEMENT_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'No',
    'Title',
    'User',
    'DeadLine',
    'Status',
    'Control',
  ];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
