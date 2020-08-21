import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { Fitness } from "../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
  styleUrls: ["./view-appointment.component.css"],
})
export class ViewAppointmentComponent implements OnInit {
  allfriends: Fitness[];
  index = 1;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getfitness();
  }

  getfitness() {
    this.userService.getfitnessdata().subscribe((data: Fitness[]) => {
      this.allfriends = data;
      //console.log(this.allfriends);
    });
  }

  editData(obj: any) {
    this.userService.userData = obj;

    //console.log(this.userService.userData);
    this.router.navigateByUrl("place-fitness-trainer-appointment");
  }

  deleteData(id: number) {
    //console.log(id);

    let res = confirm("Do you want to delete record with id " + id);

    if (res) {
      this.userService.deletefitnessdata(id).subscribe((res: any) => {
        this.getfitness();
      });
    }
  }
}
