import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../shared/models/students';
import { SnackBarService } from '../shared/models/services/snackbar.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {




  stdsArr: Array<Istudent> = [
    {
      fname: "kiran",
      lname: "Ainile",
      email: "kiran12@kiru.com",
      contact: 878384938,
      stdId: '123'
    },
    {
      fname: "Akash",
      lname: "More",
      email: "more12@xyz.com",
      contact: 8783876597,
      stdId: '124'
    },
    {
      fname: "Mayur",
      lname: "Mote",
      email: "mote1212@xyz.com",
      contact: 90346597,
      stdId: '125'
    },
    {
      fname: "Rupali",
      lname: "Pawar",
      email: "Pawar@xyz.com",
      contact: 7755664499,
      stdId: '126'
    }
  ];

  isInEditMode: boolean = false;

  
  @ViewChild('fname') fname!: ElementRef;
  @ViewChild('lname') lname!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;

  constructor(private _snackBar: SnackBarService) {}

  ngOnInit(): void {}
EditId!:string
  onStdAdd() {
    let stdobj: Istudent = {
      fname: this.fname.nativeElement.value,
      lname: this.lname.nativeElement.value,
      email: this.email.nativeElement.value,
      contact: +this.contact.nativeElement.value, 
      stdId: Date.now().toString()
    };

    this.stdsArr.unshift(stdobj);

    this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

    this._snackBar.openSnackbar(
      `The Student ${stdobj.fname} ${stdobj.lname} is added successfully..!!!`
    );
  }

  trackByStudentId(index: number, std: Istudent) {
    return std.stdId;
  }

  onRemove(stdId: string) {
    let getIndex = this.stdsArr.findIndex(s => s.stdId !== stdId);
    let removedstd= this.stdsArr.splice(getIndex,1)

    this._snackBar.openSnackbar(
      `The Student  ${removedstd[0].fname} ${removedstd[0].lname} is removed successfully ..!!!`
    );
  }



 onEdit(std:Istudent) {
  // console.log(std);
  this.isInEditMode=true
        this.EditId=std.stdId,
       this.fname.nativeElement.value =std.fname,
       this.lname.nativeElement.value=std.lname,
       this.email.nativeElement.value=std.email,
       this.contact.nativeElement.value=std.contact

       

 }
 OnUpdate(){
  let updated_Id=this.EditId
  let updated_obj:Istudent={
    fname: this.fname.nativeElement.value,
    lname: this.lname.nativeElement.value,
    email: this.email.nativeElement.value,
    contact: this.contact.nativeElement.value,
    stdId:updated_Id
  }
  console.log(updated_obj)
  let Index=this.stdsArr.findIndex(std=>std.stdId===updated_Id)
  this.stdsArr[Index]=updated_obj
  this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';
    this.EditId=''

    this._snackBar.openSnackbar(
      `The Student ${updated_obj.fname} ${updated_obj.lname} is updated successfully ..!!!`
    );

  this.isInEditMode=false



 }

}
