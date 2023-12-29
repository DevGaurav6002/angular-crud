import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users-service/users.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  allUsers:any

  createModelToBeShowned:boolean = false
  editModelToBeShowned:boolean = false
  editUserData:any

  createUserForm = new FormGroup({
    f_name: new FormControl("", Validators.required),
    l_name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    password: new FormControl("", [Validators.required, Validators.minLength(3)]),
  })

  editUserForm = new FormGroup({
    f_name: new FormControl(""),
    l_name: new FormControl(""),
    email: new FormControl(""),
    mobile: new FormControl(""),
    password: new FormControl(""),
    id: new FormControl(""),
  })

  constructor(private usersService: UsersService) {

  }

  toggleEditModel(){
    this.editModelToBeShowned = !this.editModelToBeShowned
  }

  showHideModel(){
    this.createModelToBeShowned = !this.createModelToBeShowned
  }

  createUser(){
    this.createModelToBeShowned = false
    this.usersService.createUser(this.createUserForm.value).subscribe((data) => {
      console.log('user created', data)
    })
    window.location.reload()
  }

  deleteUser(id:any){
    this.usersService.deleteUser(id).subscribe((data) => {
      console.log('user deleted', data)
    })
    window.location.reload()
  }

  editModel(id:any){
    this.editModelToBeShowned = !this.editModelToBeShowned
    this.usersService.getSingleUser(id).subscribe((data) => {
      this.editUserData = data
      this.editUserForm.controls['f_name'].setValue(this.editUserData.f_name)
      this.editUserForm.controls['l_name'].setValue(this.editUserData.l_name)
      this.editUserForm.controls['email'].setValue(this.editUserData.email)
      this.editUserForm.controls['mobile'].setValue(this.editUserData.mobile)
      this.editUserForm.controls['password'].setValue(this.editUserData.password)
      this.editUserForm.controls['id'].setValue(this.editUserData.id)
    })
  }

  editUser(){
    this.editModelToBeShowned = !this.editModelToBeShowned
    this.usersService.updateUser(this.editUserForm.value).subscribe((data) => {
      console.log('updated')
    })
    window.location.reload()
  }

  get f_name(){
    return this.createUserForm.get('f_name')
  }

  get l_name(){
    return this.createUserForm.get('l_name')
  }

  get email(){
    return this.createUserForm.get('email')
  }

  get mobile(){
    return this.createUserForm.get('mobile')
  }

  get password(){
    return this.createUserForm.get('password')
  }

  ngOnInit(){
    this.usersService.getAllUsers().subscribe((data) => {

      this.allUsers = data

      console.log(this.allUsers)

    })
  }

}
