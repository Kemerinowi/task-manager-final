import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = true;
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'genel', 'özel', 'iş'];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.taskService.getUserTasks(user.uid).subscribe((tasks) => {
        this.tasks = tasks;
        this.filterTasks();
        this.isLoading = false;
      });
    }
  }

  filterTasks() {
    if (this.selectedCategory === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === this.selectedCategory
      );
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterTasks();
  }

  toggleCompleted(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}
