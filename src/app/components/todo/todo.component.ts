import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../model/todoModel.model';


@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos:TodoModel[]=[];
  categoryId:string='';
  todoId:string='';
  title:string=''
  isAdd:boolean=true;
  
  constructor(private activeRout:ActivatedRoute,private todoService:TodoService){}

  ngOnInit(): void {
    this.activeRout.paramMap.subscribe((p)=>{
      let id=p.get('id')!
      this.categoryId=id      
    })
    this.todoService.featchTodo(this.categoryId)
    this.todoService.filterTodo.subscribe((response)=>{
      this.todos=response
    })
  }

  onSubmit(form:NgForm){
    const todoName=form.value.todoName
    this.isAdd=true
    console.log(this.todoId);
    
   
    if(this.todoId===''){
    this.todoService.createTodo(todoName,this.categoryId)
    }else{  
      this.todoService.updateTodo(this.categoryId,this.todoId,todoName)
      this.restUpdateForm()
    }
    form.reset()
  }

  onDelete(todoId:string,categoryId:string){
    this.todoService.deleteTodo(todoId,categoryId)

  }
  onEdit(todoId:string,title:string){
    this.todoId=todoId
    this.title=title
    this.isAdd=false

    
  }

  private restUpdateForm(){
    this.isAdd=true
    this.todoId=''
    this.title=''
    
    

  }

  
  
  unCompeleted(todoId:string){
    this.todoService.markUnCompleted(todoId,this.categoryId)
  }
  completed(todoId:string){
    this.todoService.markCompleted(todoId,this.categoryId)
  }

}
