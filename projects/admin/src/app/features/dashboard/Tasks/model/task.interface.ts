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
  image: string;
  title: string;
  user: string;
  deadline: string;
  status: string;
  description: string;
  userId: string;
}
