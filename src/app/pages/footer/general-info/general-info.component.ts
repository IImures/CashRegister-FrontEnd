import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {PhonePipe} from "../../../pipes/phone.pipe";

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    PhonePipe
  ],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent {

  phones : string[]= [
    "0956789993", "0974693986"
  ]

  email : string = "igor.kalinchenko@gmail.com";

  position : string = "м. Лозова, мкр-н 1, буд.12,  н/п 1";
  positionUrl : string = "https://www.google.com/maps/place/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D1%8B%D0%B5+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D1%8B/@48.8834247,36.2906194,20.25z/data=!4m6!3m5!1s0x40df28d316718e21:0xba0d07fa6c822fb5!8m2!3d48.8834007!4d36.2906572!16s%2Fg%2F11bxjm5zv9?entry=ttu";

}
