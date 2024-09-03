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
    {
      url: "#",
      title:"Facebook",
      icon: "/assets/icons/facebook.svg",
      alt: "facebook icon"
    },
    {
      url: "#",
      title:"Instagram",
      icon: "/assets/icons/instagram.svg",
      alt: "instagram icon"
    },
    {
      url: "#",
      title:"Telegram",
      icon: "/assets/icons/telegram.svg",
      alt: "telegram icon"
    },
  ];

}


export interface MediaLinks{
  url: string;
  title: string;
  icon: string;
  alt: string;
}
