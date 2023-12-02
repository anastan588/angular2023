import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import {
  ActionsSubject,
  INITIAL_STATE as mockInitialState,
  INITIAL_REDUCERS as mockReducers,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

const mockVideo = {
  kind: 'youtube#video',
  etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/tmmI1yiRrmLWlKikXk1gD3TXsUI"',
  id: 'YN8zNnV0sK8',
  snippet: {
    publishedAt: '2023-05-30T12:42:19.000Z',
    channelId: 'UCg8ss4xW9jASrqWGP30jXiw',
    title: 'Angular 8 - Быстрый курс за 60 минут',
    description:
      'Полный курс по Angular 8+:\nhttps://clc.to/angular\n\nTelegram: https://teleg.one/js_by_vladilen \nInstagram: https://www.instagram.com/vladilen.minin \nVK: https://vk.com/vladilen.minin \nГруппа VK: https://vk.com/js_by_vladilen \n\nReact Native: мобильная разработка на JavaScript:\nhttps://clc.to/rnative\n\nПоддержать выпуск новых видео:\nЯД: https://money.yandex.ru/to/410013757655670\nPayPal: https://www.paypal.me/vladilenm \n\n30 мая 2019 года бы релиз Angular 8 и я решил записать  по нему быстрый курс. В видео вы узнаете, как Angular работает, как его установить.\nВ результате урока я покажу создание Todo приложения с разными подходами. Разберем работу с сервером, сервисами, пайпами, коммуникацией между компонентами и немного RxJS\n\nИсходный код:\nhttps://github.com/vladilenm/angular8-cc\n\nAngular 8 - Быстрый курс за 60 минут',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
        width: 120,
        height: 90,
      },
      high: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/hqdefault.jpg',
        width: 480,
        height: 360,
      },
      standard: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/sddefault.jpg',
        width: 640,
        height: 480,
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

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      providers: [
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        { provide: Store },
        { provide: ActivatedRoute, useValue: { mockVideo } },
      ],
    });
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
