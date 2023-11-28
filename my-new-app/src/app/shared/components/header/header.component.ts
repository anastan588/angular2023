import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter/open-filter-menu.service';
import { SearchInputComponent } from './search-input/search-input.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectfavouriteCollection } from 'src/app/core/store/youtube/youtube.selectors';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';

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
