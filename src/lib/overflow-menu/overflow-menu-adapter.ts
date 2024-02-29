import { ForgeResizeObserver, ForgeResizeObserverCallback, deepQuerySelectorAll, getShadowElement } from '@tylertech/forge-core';
import { IMenuComponent, MenuOptionFactory } from '../menu';
import { IOverflowMenuComponent } from './overflow-menu';
import { IOverflowMenuButton, OVERFLOW_MENU_CONSTANTS } from './overflow-menu-constants';
import { ButtonComponent } from '../button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOverflowMenuAdapter {
  hideElement(el: HTMLElement): void;
  addSlotChangeListener(listener: () => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  observeDisabled(callback: MutationCallback): void;
  unobserveMutate(): void;
}

export class OverflowMenuAdapter implements IOverflowMenuAdapter {
  private _rootElement: HTMLElement;
  private _contentElement: HTMLElement;
  private _contentSlotElement: HTMLSlotElement;
  private _menuElement: IMenuComponent;

  private _mutationObserver?: MutationObserver;

  constructor(private _component: IOverflowMenuComponent) {
    this._rootElement = getShadowElement(this._component, OVERFLOW_MENU_CONSTANTS.selectors.ROOT) as HTMLSlotElement;
    // this._contentElement = getShadowElement(this._component, OVERFLOW_MENU_CONSTANTS.selectors.CONTENT);
    this._contentSlotElement = getShadowElement(this._component, OVERFLOW_MENU_CONSTANTS.selectors.CONTENT_SLOT) as HTMLSlotElement;
    this._menuElement = getShadowElement(this._component, OVERFLOW_MENU_CONSTANTS.selectors.MENU) as IMenuComponent;
  }

  public addSlotChangeListener(listener: () => void): void {
    this._contentSlotElement.addEventListener('slotchange', listener);
  }

  public getSlottedButtons(): IOverflowMenuButton['element'][] {
    const nodeList = this._component.querySelectorAll<IOverflowMenuButton['element']>(OVERFLOW_MENU_CONSTANTS.selectors.BUTTONS);
    return Array.from(nodeList);
  }

  public observeResize(callback: ForgeResizeObserverCallback): void {
    ForgeResizeObserver.observe(this._rootElement, callback);
  }

  public unobserveResize(): void {
    ForgeResizeObserver.unobserve(this._rootElement);
  }

  // Observe disabled attribute change on native button
  public observeDisabled(callback: MutationCallback): void {
    this._mutationObserver = new MutationObserver(callback);
    this.getSlottedButtons().forEach(button => {
      const htmlButton = (button as Element).getElementsByTagName('button')[0];
      this._mutationObserver?.observe(htmlButton, {
        attributes: true,
        attributeFilter: ['disabled']
      });
    });
  }

  public unobserveMutate(): void {
    this._mutationObserver?.disconnect();
    this._mutationObserver = undefined;
  }

  public showElement(el: HTMLElement): void {

  }

  public hideElement(el: HTMLElement): void {
    el.style.display = 'none';
  }

  public calculatedWidth(el: HTMLElement): number {
    return 0;
  }

  public setMenuOptions(options: MenuOptionFactory): void {
    this._menuElement.options = options;
  }

}
