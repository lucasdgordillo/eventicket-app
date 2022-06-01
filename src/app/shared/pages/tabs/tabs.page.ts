import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Storage } from '@capacitor/storage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  role: Role = Role.USER;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
  }

  redirectTo(url) {
    this.router.navigate([url]);
  }
}
