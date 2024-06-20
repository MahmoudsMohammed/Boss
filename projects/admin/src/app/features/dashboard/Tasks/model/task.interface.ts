import { user } from '../../../../core/model/user.interface';

export interface Task {
  _id: string;
  title: string;
  userId: user;
  image: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface tasksDataTable {
  id: string;
  Image: string;
  Title: string;
  User: string;
  DeadLine: string;
  Status: string;
  Description: string;
}
