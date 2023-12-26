import {
  Component,
  DoCheck,
} from '@angular/core';
import { OpenFilterMenuService } from './../../../core/services/open-filter/open-filter-menu.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavoriteService } from './../../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck {
  isMenuOpen = false;

  constructor(
    public readonly openFilterMenuService: OpenFilterMenuService,
    public readonly favoriteService: FavoriteService,
    private router: Router,
    private store: Store
  ) {}
  ngDoCheck() {
    this.isMenuOpen = this.openFilterMenuService.openFilterMenu.valueOf();
  }

  showAdminPage() {
    this.router.navigate(['admin']);
  }
  showMainPage() {
    this.router.navigate(['main']);
  }
  showFavoritePage() { 
    this.favoriteService.canRouteToFavoritePage$.next(true);
    // this.store.select(selectfavouriteCollection).subscribe(() => {
      
    // });
    this.router.navigate(['favorite']);     
    setTimeout(()=> {
        this.favoriteService.canRouteToFavoritePage$.next(false);
      },1000)
  }
}
