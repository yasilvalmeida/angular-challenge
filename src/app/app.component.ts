import { Component, ViewChild, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ApiService } from './api.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Challenge';
  _errorMessage: string = "";
  _okMessage: string = "";
  displayedColumns: string[] = ['id', 'name', 'update'];
  dataSource: User[] = new Array();

  //@ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(
    private _apiService: ApiService,
    public dialog: MatDialog) {}

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }
    });
  }
  randomInt(min: number, max: number) {
    return min + Math.floor((max - min) * Math.random());
  }
  addRowData(row_obj: any){
    console.log("insert", row_obj)
    let user = {
      id: this.randomInt(1, 1000),
      name: row_obj.name,
      countries: [1]
    };
    this.addNewUser(user);
  }
  updateRowData(row_obj: any) {
    let user = {
      id: row_obj.id,
      name: row_obj.name
    };
    this.updateUser(user);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this.getAllUsers();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {}

  // Get all users
  getAllUsers(): void {
    this._apiService.getAllUsers()
    .subscribe
    (
        data => {
          this.dataSource = data;
        },
        error => {
          console.log(error)
        }
    );
  }

  // Add new user
  addNewUser(user: any): void {
    this._apiService.addNewUser(user)
    .subscribe
    (
        data => {
          this.dataSource.push(data);
          this._okMessage = "Insert user success!"
        },
        error => {
          console.log(error)
          this._errorMessage = error;
        }
    );
  }

  // Update an user
  updateUser(user: User): void {
    this._apiService.updateUser(user)
    .subscribe
    (
        data => {
          this.dataSource.filter((value, key)=>{
            if(value.id == user.id){
              value.name = user.name;
            }
            return true;
          });
          this._okMessage = "Update user success!"
        },
        error => {
          console.log(error)
        }
    );
  }
}