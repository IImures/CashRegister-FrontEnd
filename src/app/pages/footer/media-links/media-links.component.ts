import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-media-links',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './media-links.component.html',
  styleUrl: './media-links.component.scss'
})
export class MediaLinksComponent {

  links: MediaLinks[] = [
    // {
    //   url: "#",
    //   title:"Facebook",
    //   icon: "/assets/icons/facebook.svg",
    //   alt: "facebook icon"
    // },
    // {
    //   url: "#",
    //   title:"Instagram",
    //   icon: "/assets/icons/instagram.svg",
    //   alt: "instagram icon"
    // },
    {
      url: "https://t.me/IgorKkalinchenko",
      title:"Telegram",
      icon: "/assets/icons/telegram.svg",
      alt: "Telegram icon"
    },
    {
      url: "viber://contact?number=%2B380956789993",
      title:"Viber",
      icon: "/assets/icons/viber.svg",
      alt: "Viber icon"
    },
  ];

}


export interface MediaLinks{
  url: string;
  title: string;
  icon: string;
  alt: string;
}
