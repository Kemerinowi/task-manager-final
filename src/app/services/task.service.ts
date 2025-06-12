import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collectionData,
  query,
  where,
  Timestamp,
} from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private firestore = inject(Firestore);

  constructor() {}

  // Görev ekle
  addTask(task: Omit<Task, 'id'>) {
    const taskRef = collection(this.firestore, 'tasks');
    const payload = {
      ...task,
      createdAt: new Date(),
    };
    return addDoc(taskRef, payload);
  }

  // Sadece belli kullanıcıya ait görevleri getir
  getUserTasks(userId: string): Observable<Task[]> {
    const taskRef = collection(this.firestore, 'tasks');
    const q = query(taskRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  // Görev sil
  deleteTask(id: string) {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDocRef);
  }

  // Görev güncelle
  updateTask(id: string, data: Partial<Task>) {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskDocRef, data);
  }
}
