import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../models/about/about.component';
import { PrivacypolicyComponent } from '../models/privacypolicy/privacypolicy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private dialog: MatDialog) { }

  openAppInfoModal(): void {
    this.dialog.open(AboutComponent);
  }
  openAppPolicyModal(): void {
    this.dialog.open(PrivacypolicyComponent);
  }

}
