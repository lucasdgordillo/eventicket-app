import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/auth/models/role.enum';
import { RegisterPage } from 'src/app/auth/pages/register/register.page';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-page',
  templateUrl: 'users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit, OnDestroy {
  users = [];
  userRol: Role = Role.ADMIN;
  userId: string = '';
  private ngUnsubscribe = new Subject();

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private loadingHelper: LoadingHelper,
    private messageHelper: MessageHelper,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.userRol = role;
    });
    this.authService.getUserId().subscribe((userId: string) => {
      this.userId = userId;
    });
    this.loadUsers();
  }

  doRefresh(event) {
    this.users = [];
    this.loadUsers();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  async loadUsers() {
    this.loadingHelper.present();
    this.usersService.getUsersByCreator().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.users = response.data;
      this.loadingHelper.dismiss();
    });
  }

  public async openRegisterUserModal(userData = null) {
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        userData: userData,
        modalMode: true,
        userRol: this.userRol,
        userId: this.userId
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.action === 'create') {
        this.loadingHelper.present();
        this.authService.register(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Usuario creado con exito!');
          this.loadUsers();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
    }
  }

  public editUser(event) {
    const userData = this.users.find((rrpp) => { if (rrpp.id == event.id) { return rrpp; }});
    this.openRegisterUserModal(userData);
  }

  getFullName(userData) {
    if (userData.displayName) {
      return userData.displayName;
    }
    return `${userData.firstName} ${userData.lastName}`;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}