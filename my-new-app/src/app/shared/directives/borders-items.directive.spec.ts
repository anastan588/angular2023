import { ElementRef, Renderer2 } from '@angular/core';
import { BordersItemsDirective } from './borders-items.directive';

describe('BordersItemsDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new BordersItemsDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
