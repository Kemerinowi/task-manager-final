export interface Task {
  id?: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}
