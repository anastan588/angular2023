import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteItemComponent } from './favorite-item.component';
import { FilterPipe } from './../../../../shared/pipes/filter.pipe';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
const mockVideo = {
  kind: 'youtube#video',
  etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/tmmI1yiRrmLWlKikXk1gD3TXsUI"',
  id: { kind: 'YN8zNnV0sK8', videoId: 'YN8zNnV0sK8' },
  snippet: {
    publishedAt: '2023-05-30T12:42:19.000Z',
    title: 'Angular 8 - Быстрый курс за 60 минут',
    description:
      'Полный курс по Angular 8+:\nhttps://clc.to/angular\n\nTelegram: https://teleg.one/js_by_vladilen \nInstagram: https://www.instagram.com/vladilen.minin \nVK: https://vk.com/vladilen.minin \nГруппа VK: https://vk.com/js_by_vladilen \n\nReact Native: мобильная разработка на JavaScript:\nhttps://clc.to/rnative\n\nПоддержать выпуск новых видео:\nЯД: https://money.yandex.ru/to/410013757655670\nPayPal: https://www.paypal.me/vladilenm \n\n30 мая 2019 года бы релиз Angular 8 и я решил записать  по нему быстрый курс. В видео вы узнаете, как Angular работает, как его установить.\nВ результате урока я покажу создание Todo приложения с разными подходами. Разберем работу с сервером, сервисами, пайпами, коммуникацией между компонентами и немного RxJS\n\nИсходный код:\nhttps://github.com/vladilenm/angular8-cc\n\nAngular 8 - Быстрый курс за 60 минут',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
      high: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/hqdefault.jpg',
      },
      standard: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/sddefault.jpg',
      },
    },
    channelTitle: 'Владилен Минин',
    tags: ['angular', 'angular 8'],
  },
  statistics: {
    viewCount: '33265',
    likeCount: '1173',
    dislikeCount: '26',
    favoriteCount: '0',
    commentCount: '170',
  },
};
describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteItemComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FilterPipe,
        { provide: '_HttpClient', useClass: HttpClient },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ video: mockVideo }),
          },
        },
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;
    component.video = {
      kind: mockVideo.kind,
      etag: mockVideo.etag,
      id: mockVideo.id,
      snippet: {
        publishedAt: mockVideo.snippet.publishedAt,
        title: mockVideo.snippet.title,
        description: mockVideo.snippet.title,
        thumbnails: {
          default: {
            url: mockVideo.snippet.thumbnails.default.url,
          },
          high: {
            url: mockVideo.snippet.thumbnails.high.url,
          },
          standard: {
            url: mockVideo.snippet.thumbnails.standard.url,
          },
        },
        tags: mockVideo.snippet.tags,
      },
      statistics: {
        viewCount: mockVideo.statistics.viewCount,
        likeCount: mockVideo.statistics.likeCount,
        dislikeCount: mockVideo.statistics.dislikeCount,
        favoriteCount: mockVideo.statistics.favoriteCount,
        commentCount: mockVideo.statistics.commentCount,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
