import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";

export class Fitness {
  constructor(
    public id: number,
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  public obj: any = {};

  packageSelectFlag = true;
  trainerSelectFlag = true;
  physiotherapistSelectFlag = true;
  ageFlag = true;
  updateFlag = false;
  tempData: Fitness;
  updateId: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.userService.userData) {
      this.initializeForm(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      this.updateFlag = false;
      this.updateId = null;
    } else {
      this.tempData = this.userService.userData;
      this.updateFlag = true;
      this.updateId = this.tempData.id;
      this.initializeForm(
        this.tempData.firstname,
        this.tempData.lastname,
        this.tempData.phonenumber,
        this.tempData.email,
        this.tempData.inr,
        this.tempData.paisa,
        this.tempData.streetaddress,
        this.tempData.city,
        this.tempData.state,
        this.tempData.country,
        this.tempData.pincode,
        this.tempData.age,
        this.tempData.trainerpreference,
        this.tempData.physiotherapist,
        this.tempData.packages
      );
      this.userService.userData = undefined;
    }
  }

  initializeForm(
    passfirstname,
    passlastname,
    passphno,
    passemail,
    passinr,
    passpaisa,
    passstreetadd,
    passcity,
    passstate,
    passcountry,
    passpincode,
    passage,
    passtrainerpreference,
    passphysiotherapist,
    passpackages
  ) {
    this.fitnessForm = this.fb.group({
      firstname: [passfirstname, [Validators.required]],
      lastname: [passlastname, [Validators.required]],
      phonenumber: [passphno, [Validators.required]],
      email: [
        passemail,
        [Validators.required, Validators.pattern("[^ @]*@[^ @]*")],
      ],
      inr: [passinr, [Validators.required]],
      paisa: [passpaisa, [Validators.required]],
      streetaddress: [passstreetadd, [Validators.required]],
      city: [passcity, [Validators.required]],
      state: [passstate, [Validators.required]],
      country: [passcountry, [Validators.required]],
      pincode: [passpincode, [Validators.required]],
      age: [passage, [Validators.required]],
      trainerpreference: [passtrainerpreference, [Validators.required]],
      physiotherapist: [passphysiotherapist, [Validators.required]],
      packages: [passpackages, [Validators.required]],
    });
  }

  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    // console.log(
    //   "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
    //   this.fitnessForm.value
    // );

    if (this.fitnessForm.valid && !this.updateFlag) {
      this.userService
        .postfitnessdata(this.fitnessForm.value)
        .subscribe((res) => {
          //console.log("Appointment created!");
        });
      /*this.contactdata.emit(
                new Contact(
                this.fitnessForm.value.firstname,
                this.fitnessForm.value.lastname,
                this.fitnessForm.value.phonenumber,
                this.fitnessForm.value.email,
                this.fitnessForm.value.message
                )
            );*/
      alert("Appointment Created");
      this.ngOnInit();
    } else {
      this.userService
        .editfitnessdata(this.fitnessForm.value, this.updateId)
        .subscribe((res) => {
          console.log("Update created!");
        });
      this.router.navigateByUrl("view-appointment");
    }
  }

  validateAge(ageValue) {
    var value = Number(ageValue);
    if (value < 60 && value > 18) {
      this.ageFlag = true;
    } else {
      this.ageFlag = false;
    }
  }

  validatePackage(value) {
    if (value === "") {
      this.packageSelectFlag = true;
    } else {
      this.packageSelectFlag = false;
    }
  }

  validateTrainer(value) {
    if (value === "") {
      this.trainerSelectFlag = true;
    } else {
      this.trainerSelectFlag = false;
    }
  }
  validatePhysiotherapist(value) {
    if (value === "") {
      this.physiotherapistSelectFlag = true;
    } else {
      this.physiotherapistSelectFlag = false;
    }
  }
}
