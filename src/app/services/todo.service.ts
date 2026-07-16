import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { TodoModel } from '../model/todoModel.model';
import { CategoryService } from './category.service';
import { url } from 'inspector';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly todoUrl: string = 'http://localhost:3000/todos'
  filterTodo = new BehaviorSubject<TodoModel[]>([])

  constructor(private http: HttpClient, private categoryService: CategoryService,private toaster:ToastrService) { }
  featchTodo(categoryId: string) {

    this.http.get<TodoModel[]>(this.todoUrl).subscribe({
      next: (response) => {
        let items: TodoModel[] = []
        response.filter((item) => {
          if (item.categoryId === categoryId) {
            items.push(item)
          }


        })
        this.filterTodo.next(items)

      }
    })


  }
  createTodo(todoName: string, categoryId: string) {
    const newTodo: TodoModel = {
      title: todoName,
      isCompleted: false,
      categoryId: categoryId
    }
    this.http.post<TodoModel>(this.todoUrl, newTodo).subscribe({
      next: (response) => {
        const currentTodoItem = this.filterTodo.getValue() || []
        this.filterTodo.next([...currentTodoItem, response])
        this.categoryService.incrementCountTodo(categoryId)
      },
      complete:()=>{
        this.toaster.success('آیتم مورد نظر اضافه شد')
      }
    })


  }

  deleteTodo(todoId: string, categoryId: string) {
    this.http.delete(this.todoUrl + '/' + todoId).subscribe({
      complete: () => {
        this.featchTodo(categoryId)
        this.categoryService.decrmentCountTodo(categoryId)
        this.toaster.info('آیتم مورد نظر حذف شد')

      }

    })

  }
  updateTodo(categoryId:string,todoId:string,title:string){
    this.http.patch(`${this.todoUrl}/${todoId}`,{title:title}).subscribe({
      complete:()=>{
        this.featchTodo(categoryId)
        this.toaster.success('آیتم مورد نظر ویرایش شد')

      }
    })

  }
  markCompleted(todoId:string,categoryId:string){
    this.http.patch(`${this.todoUrl}/${todoId}`,{isCompleted:true}).subscribe({
      complete:()=>{
        this.featchTodo(categoryId)
      }
    })
  }
  markUnCompleted(todoId:string,categoryId:string){
    this.http.patch(`${this.todoUrl}/${todoId}`,{isCompleted:false}).subscribe({
      complete:()=>{
        this.featchTodo(categoryId)
      }
    })
  }
}
