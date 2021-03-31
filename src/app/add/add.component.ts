import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input() cartName:string="";

  post:any[]=[];
 msg:String='';
  constructor(private fb: FormBuilder,private service:DataService) 
  {
     
   this.form = fb.group({
     password: ['', [Validators.required]],
     confirm_password: ['', [Validators.required]]
   }, { 
     validator: ConfirmedValidator('password', 'confirm_password')
   })
  }
  ngOnInit() {
    
  }

  

  public form: FormGroup = new FormGroup({});
    
    
      
    get f(){
      return this.form.controls;
    }
     
    submit(){
      console.log(this.form.value);
    }
     
      insertRecord(name:any,bname:any)
    {
    let obj={
  
      "buisinessName":name.value,
      
     "clients":[{
               "clientName":bname.value
             }]
  }
    
    // };
    this.service.sendPostData(obj).subscribe((responce)=>{
      console.log(responce);
    });
    this.post.push(obj);
     this.msg="Resister successfully";
   
  }
  

  
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
