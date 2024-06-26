
import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';




export interface ToDo {
  title: string;
  id:number;
  completed:boolean;

}




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,CommonModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})





export class HomeComponent {

  todos: ToDo[] = [];


  constructor(private apiService: ApiService) { }


  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<ToDo>(this.todos);
  selection = new SelectionModel<ToDo>(true, []);

disabled:boolean=false;

  ngOnInit(){
    this.todos=this.apiService.getApiUrl().subscribe((res:any)=>{
      this.dataSource.data=res;
      
      console.log(this.dataSource.data)
      console.log(res);
    })

  
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.dataSource.data.forEach(row => {
      if (!row.completed) {
        this.selection.select(row);
      }
    });
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return row.completed ? 'completed' : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  toggleRow(row:any) {
    if (!row.completed) {
      this.selection.toggle(row);
    }
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

}
