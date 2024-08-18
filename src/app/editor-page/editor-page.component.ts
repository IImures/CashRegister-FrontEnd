import {Component, ViewEncapsulation} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {isPlatformBrowser, NgIf} from "@angular/common";
import { PLATFORM_ID, Inject } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [CKEditorModule, NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent {

  isBrowser: boolean;
  editorLoaded: boolean = false;
  Editor: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then(ClassicEditor => {
        this.Editor = ClassicEditor.default;
        this.editorLoaded = true;
      });
    }
  }

}
