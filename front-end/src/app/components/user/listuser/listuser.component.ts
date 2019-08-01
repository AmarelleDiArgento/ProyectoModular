import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
declare let $: any;
//components table
import { UpdateComponent } from '../../../components/tablerender/update/update.component';
//import { DeleteComponent } from '../../../components/tablerender/delete/delete.component';
import { ResetComponent } from '../../../components/tablerender/reset/reset.component';
// service auth
import { UserService } from '../../../services/user.service';
// service excel
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ListuserComponent implements OnInit {
  // list data ws user
  listUser: [];
  //datatable init
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  //name module
  private nameModule: String;

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private router: Router,
    private updateComponent: UpdateComponent,
    private resetComponent: ResetComponent,
    private changeDetectorRefs: ChangeDetectorRef) { 
    }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect(); 
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.getAllData();
    //send name module
    this.nameModule = "user";
  }
  //get all data
  getAllData() {
    // send to search api backend all category
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listUser = data.rows;
        this.dtTrigger.next();
      });
  }
  // redirect to create 
  createUser() {
    this.router.navigate(['/createuser']);
  }
  // redirect to update
  updateUser(idUser, username){
    this.updateComponent.update(this.nameModule, idUser, username);
  }
  async deleteUser(idUser){
   // this.deleteComponent.delete(this.nameModule,idUser);
   this.userService.delete(idUser)
   .subscribe(data => {
   this.changeDetectorRefs.detectChanges();
  });
  }
  //export xsl
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listUser, 'ReporteUsuarios');
  }
  //reset password
  resetPassword(idUser){
    this.resetComponent.resetPassword(this.nameModule,idUser);
  }

}
