import { Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
  LoadingController, ToastController,
  AlertController, IonInfiniteScroll, IonRefresher, Platform, ModalController, NavController
} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import Swal, { SweetAlertIcon, SweetAlertInput } from 'sweetalert2';

export abstract class BasePage {

  public isErrorViewVisible: boolean;
  public isEmptyViewVisible: boolean;
  public isContentViewVisible: boolean;
  public isLoadingViewVisible: boolean;

  protected refresher: IonRefresher;
  protected infiniteScroll: IonInfiniteScroll;
  protected navParams: ActivatedRoute;
  protected translate: TranslateService;
  protected router: Router;
  protected modalCtrl: ModalController;

  private loader: any;
  private toastCtrl: ToastController;
  private loadingCtrl: LoadingController;
  private alertCtrl: AlertController;
  private navCtrl: NavController;
  private platform: Platform;

  protected activatedRoute: ActivatedRoute;
  private meta: Meta;
  private title: Title;

  private inAppBrowser: InAppBrowser;
  private safariViewController: SafariViewController;

  constructor(injector: Injector) {

    this.loadingCtrl = injector.get(LoadingController);
    this.toastCtrl = injector.get(ToastController);
    this.alertCtrl = injector.get(AlertController);
    this.navParams = injector.get(ActivatedRoute);
    this.translate = injector.get(TranslateService);
    this.modalCtrl = injector.get(ModalController);
    this.platform = injector.get(Platform);
    this.navCtrl = injector.get(NavController);

    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.meta = injector.get(Meta);
    this.title = injector.get(Title);

    this.inAppBrowser = injector.get(InAppBrowser);
    this.safariViewController = injector.get(SafariViewController);
  }

  abstract enableMenuSwipe(): boolean;

  public get isCordova(): boolean {
    return this.platform.is('cordova');
  }

  public get isPwa(): boolean {
    return this.platform.is('pwa');
  }

  public get isDesktop(): boolean {
    return this.platform.is('desktop');
  }

  public get isMobile(): boolean {
    return this.platform.is('mobile');
  }

  public get isAndroid(): boolean {
    return this.platform.is('android');
  }

  public get appUrl(): string {
    return environment.appUrl;
  }

  public get appImageUrl(): string {
    return environment.appImageUrl;
  }

  public setPageTitle(title: string): void {
    this.title.setTitle(title);
  }

  public async setMetaTags(config1: {
    title?: string,
    description?: string,
    image?: string,
    slug?: string
  }) {

    const str = await this.getTrans(['APP_NAME', 'APP_DESCRIPTION']);

    const config = {
      title: str.APP_NAME,
      description: str.APP_DESCRIPTION,
      image: this.appImageUrl,
      ...config1
    };

    let url = this.appUrl + this.router.url;

    if (config.slug) {
      url = this.appUrl + '/' + config.slug
    }

    this.meta.updateTag({
      property: 'og:title',
      content: config.title
    });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description
    });

    this.meta.updateTag({
      property: 'og:image',
      content: config.image
    });

    this.meta.updateTag({
      property: 'og:image:alt',
      content: config.title
    });

    this.meta.updateTag({
      property: 'og:url',
      content: url
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: config.title
    });

    this.meta.updateTag({
      name: 'twitter:text:title',
      content: config.title
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description
    });

    this.meta.updateTag({
      name: 'twitter:image',
      content: config.image
    });

    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: config.title
    });
  }

  public getShareUrl(slug: string) {
    return this.appUrl + '/' + slug;
  }

  async showLoadingView(params: { showOverlay: boolean }) {

    if (params.showOverlay) {

      const loadingText = await this.getTrans('LOADING');

      this.loader = await this.loadingCtrl.create({
        message: loadingText,
        backdropDismiss: true,
      });

      return await this.loader.present();

    } else {

      this.isErrorViewVisible = false;
      this.isEmptyViewVisible = false;
      this.isContentViewVisible = false;
      this.isLoadingViewVisible = true;
    }

    return true;

  }

  async dismissLoadingView() {

    if (!this.loader) return;

    return await this.loader.dismiss();
  }

  showContentView() {

    this.isErrorViewVisible = false;
    this.isEmptyViewVisible = false;
    this.isLoadingViewVisible = false;
    this.isContentViewVisible = true;

    this.dismissLoadingView();
  }

  showEmptyView() {

    this.isErrorViewVisible = false;
    this.isLoadingViewVisible = false;
    this.isContentViewVisible = false;
    this.isEmptyViewVisible = true;

    this.dismissLoadingView();
  }

  showErrorView() {

    this.isLoadingViewVisible = false;
    this.isContentViewVisible = false;
    this.isEmptyViewVisible = false;
    this.isErrorViewVisible = true;

    this.dismissLoadingView();
  }

  onRefreshComplete(data = null) {

    if (this.refresher) {
      this.refresher.disabled = true;
      this.refresher.complete();
      setTimeout(() => {
        this.refresher.disabled = false;
      }, 100);
    }

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();

      if (data && data.length === 0) {
        this.infiniteScroll.disabled = true;
      } else {
        this.infiniteScroll.disabled = false;
      }
    }
  }

  async showToast(message: string) {

    const closeText = await this.getTrans('CLOSE');

    const toast = await this.toastCtrl.create({
      message,
      color: 'dark',
      position: 'bottom',
      cssClass: 'tabs-bottom',
      duration: 3000,
      buttons: [{
        text: closeText,
        role: 'cancel',
      }
      ]
    });

    return await toast.present();
  }

  async showAlert(message: string) {

    const okText = await this.getTrans('OK');

    const alert = await this.alertCtrl.create({
      header: '',
      message,
      buttons: [{
        text: okText,
        role: ''
      }]
    });

    return await alert.present();
  }

  async showConfirm(message: string) {

    const trans = await this.getTrans(['OK', 'CANCEL']);

    const confirm = await this.alertCtrl.create({
      header: '',
      message,
      buttons: [{
        text: trans.CANCEL,
        role: 'cancel',
      }, {
        text: trans.OK,
        role: ''
      }]
    });

    return await confirm.present();
  }

  async showSweetConfirm(title: string, html: string, icon: SweetAlertIcon) {
    const trans = await this.getTrans(['CONFIRM', 'CANCEL']);

    return Swal.fire({
      title,
      text: html,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: trans.CONFIRM,
      cancelButtonColor: '#3085d6',
      cancelButtonText: trans.CANCEL,
      heightAuto: false
    });
  }

  async showSweetInput(input: SweetAlertInput, text: string, placeholderText: string, confirmText: string, cancelText: string, customClass = {}) {

    return await Swal.fire({
      title: '',
      html: text,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      showCancelButton: true,
      input,
      inputPlaceholder: placeholderText,
      heightAuto: false,
      onOpen: () => {
        const confirmBtn = Swal.getConfirmButton();
        confirmBtn.setAttribute('disabled', '');
        Swal.getInput().addEventListener('keyup', (e: any) => {
          if (e.target.value) {
            confirmBtn.removeAttribute('disabled');
          } else {
            confirmBtn.setAttribute('disabled', '');
          }
        })
      },
      showClass: {
        popup: 'animated fade-in '
      },
      customClass,
      position: 'center',
    });
  }

  async openUrl(url: string) {

    if (!url) return;

    if (this.isCordova) {

      try {

        const isAvailable = await this.safariViewController.isAvailable();

        if (isAvailable) {
          await this.safariViewController.show({
            url: url,
            toolbarColor: environment.androidHeaderColor,
          }).toPromise();
        } else {
          this.inAppBrowser.create(url, '_system');
        }
      } catch (error) {
        console.log(error);
      }

    } else if (this.isPwa) {
      this.inAppBrowser.create(url, '_blank');
    } else {
      this.inAppBrowser.create(url, '_system');
    }

  }

  openSimpleUrl(url: string) {
    this.inAppBrowser.create(url, '_system');
  }

  navigateTo(page: any, queryParams: any = {}) {
    this.router.navigate([page], {queryParams });
  }

  navigateToRelative(page: any, queryParams: any = null) {
    return this.router.navigate([page], {
      queryParams,
      relativeTo: this.activatedRoute,
      queryParamsHandling: queryParams ? 'merge' : '',
    });
  }

  createUrlTree(queryParams: any = {}) {
    return this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  setRoot(page: string) {
    this.navCtrl.navigateRoot(page);
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }

  getTrans(key: string | string[], params: any = {}) {
    return this.translate.get(key, params).toPromise();
  }

}
