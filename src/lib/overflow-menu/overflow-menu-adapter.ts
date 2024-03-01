import { ForgeResizeObserver, ForgeResizeObserverCallback, deepQuerySelectorAll, getShadowElement } from '@tylertech/forge-core';
import { IMenuComponent, MenuOptionFactory } from '../menu';
import { IOverflowMenuComponent } from './overflow-menu';
import { IOverflowMenuButton, OVERFLOW_MENU_CONSTANTS } from './overflow-menu-constants';
import { BaseAdapter, IBaseAdapter } from '../core';
import { IIconButtonComponent } from '../icon-button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOverflowMenuAdapter extends IBaseAdapter {
  hideElement(el: HTMLElement): void;
  showElement(el: HTMLElement): void;
  addSlotChangeListener(listener: () => void): void;
  observeResize(callback: (entry: ResizeObserverEntry) => void): void;
  unobserveResize(): void;
  observeDisabled(callback: MutationCallback): void;
  unobserveMutate(): void;
  setMenuOptions(optionFactory: MenuOptionFactory): void;
  slottedButtons: IOverflowMenuButton['element'][];
  menuButtonElement: IIconButtonComponent;
}

export class OverflowMenuAdapter extends BaseAdapter<IOverflowMenuComponent> implements IOverflowMenuAdapter {
  private _rootElement: HTMLElement;
  private _contentSlotElement: HTMLSlotElement;
  private _menuButtonElement: IIconButtonComponent;
  private _menuElement: IMenuComponent;

  private _mutationObserver?: MutationObserver;

  constructor(private component: IOverflowMenuComponent) {
    super(component);
    this._rootElement = getShadowElement(this.component, OVERFLOW_MENU_CONSTANTS.selectors.ROOT) as HTMLSlotElement;
    this._contentSlotElement = getShadowElement(this.component, OVERFLOW_MENU_CONSTANTS.selectors.CONTENT_SLOT) as HTMLSlotElement;
    this._menuButtonElement = getShadowElement(this.component, OVERFLOW_MENU_CONSTANTS.selectors.MENU_BUTTON) as IIconButtonComponent;
    this._menuElement = getShadowElement(this.component, OVERFLOW_MENU_CONSTANTS.selectors.MENU) as IMenuComponent;

  }

  public addSlotChangeListener(listener: () => void): void {
    this._contentSlotElement.addEventListener('slotchange', listener);
  }

  public get slottedButtons(): IOverflowMenuButton['element'][] {
    const nodeList = this.component.querySelectorAll<IOverflowMenuButton['element']>(OVERFLOW_MENU_CONSTANTS.selectors.BUTTONS);
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
    this.slottedButtons.forEach(button => {
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

  public get menuButtonElement(): typeof this._menuButtonElement {
    return this._menuButtonElement;
  }

  public showElement(el: HTMLElement): void {
    el.style.display = ''; // same as revert-layer basically?
  }

  public hideElement(el: HTMLElement): void {
    el.style.display = 'none';
  }

  public calculatedWidth(el: HTMLElement): number {
    return 0;
  }

  public setMenuOptions(optionFactory: MenuOptionFactory): void {
    console.log('optionfac');
    this._menuElement.options = optionFactory; // setting here isn't working. is this a bug with menu getter or setter?
    console.log(this._menuElement.options); // returns empty array
  }

}
