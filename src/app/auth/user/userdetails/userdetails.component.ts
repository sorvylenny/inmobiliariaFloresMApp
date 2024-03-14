import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {

  userD!: User;
  constructor(private authService: AuthService, private router: Router, private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    let userId : any = this.activerouter.snapshot.paramMap.get('id')
    this.userDetails(userId);
  }

  userDetails(id: string) {
    this.authService.userDetails(id).subscribe(user => {
      this.userD = user;
      console.log(user)
    });
  }
  goBack(){
    this.router.navigate(['/auth/user/allUser'])
  }
}
