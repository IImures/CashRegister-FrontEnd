import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ListComponentComponent} from "./list-component/list-component.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    ListComponentComponent,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  //private id:string ='';

 constructor(private route: ActivatedRoute){}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    //
    // });
  }

}
