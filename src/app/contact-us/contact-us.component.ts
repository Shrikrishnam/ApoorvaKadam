import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { contact } from "../interface/contacts";
import { UserService } from "../_services/user.service";

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) {}
}
@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  data: Contact = {
    firstname: "",
    lastname: "",
    phonenumber: null,
    email: "",
    message: "",
  };

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      message: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );

      this.userService.postContactdata(this.data).subscribe(() => {
        console.log("sucess");
        this.contactForm.reset();
        alert("Successfully submited the data");
      });
    }
  }
}
