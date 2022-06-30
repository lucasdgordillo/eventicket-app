import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { UsersService } from '../../services/users.service';
import { EditUserModalPage } from '../edit-user-modal/edit-user-modal.page';

@Component({
  selector: 'profile-settings-page',
  templateUrl: 'profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})

export class ProfileSettingsPage implements OnInit {
  role: Role = Role.USER;
  userData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalController: ModalController,
    private loadingHelper: LoadingHelper,
    private messageHelper: MessageHelper,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserData().subscribe((response) => {
      this.userData = response.data;
    });
  }

  public openPage(page) {
    this.router.navigate([page]);
  }

  public async openEditUserModal() {
    const modal = await this.modalController.create({
      component: EditUserModalPage,
      componentProps: {
        userData: this.userData
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      console.log(data);

      if (data.action === 'update') {
        this.loadingHelper.present();
        this.usersService.updateUser(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.loadUserData();
          this.messageHelper.presentToast('Perfil actualizado con exito!');
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
    }
  }

  logoutAction() {
    this.authService.logout();
  }
}