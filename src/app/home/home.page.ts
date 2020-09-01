import { Component } from '@angular/core';
import { UtilityService } from '../service/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pollutants: any[];
  pollutantsTemp: any[];
  constructor(public utilityservice: UtilityService) {
    this.getCustomerList();
  }

  getCustomerList() {
    this.utilityservice.get({})
      .subscribe(
        (response: any) => {
          if (!response.err_code) {
            this.pollutants = response.records;
            this.pollutantsTemp = response.records;
          } else {
            console.log("Error in API !!");
          }
        },
      );
  }

  getItems(ev: any) {
    this.pollutants = this.pollutantsTemp;

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.pollutants = this.pollutants.filter((item) => {
        return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
