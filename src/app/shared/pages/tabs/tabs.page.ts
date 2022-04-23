import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  role: Role;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
  }
}
