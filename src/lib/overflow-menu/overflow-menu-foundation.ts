import { ForgeResizeObserverCallback, ICustomElementFoundation } from '@tylertech/forge-core';

import { IOverflowMenuAdapter } from './overflow-menu-adapter';
import { ICON_BUTTON_CONSTANTS, IconButtonComponent } from '../icon-button';
import { BUTTON_CONSTANTS, ButtonComponent } from '../button';

export interface IOverflowMenuFoundation extends ICustomElementFoundation {

}

export class OverflowMenuFoundation implements IOverflowMenuFoundation {
  private _slotChangeListener: () => void;
  private _resizeObserverCallback: ForgeResizeObserverCallback;

  constructor(private _adapter: IOverflowMenuAdapter) {
    this._slotChangeListener = () => this._onSlotChange();
    this._resizeObserverCallback = (entry: ResizeObserverEntry) => this._onResize(entry); // todo throttle?
  }

  public initialize(): void {
    this._adapter.addSlotChangeListener(this._slotChangeListener);
    this._adapter.observeResize(this._resizeObserverCallback);
    this._adapter.observeDisabled(this._onDisable);
  }

  public disconnect(): void {

  }

  private _onSlotChange(): void {
    console.log('slot change'); // contentchildren equivalent
  }

  private _onResize(entry: ResizeObserverEntry): void {
    console.log('on resize');
  }

  private _onDisable: MutationCallback = (mutations: MutationRecord[], observer: MutationObserver) => {
    console.log('on mutate');
    // todo optimize to update only the relevant property of the relevant menu option (currently just observing disabled via attributefilter)
    this._buildMenu();
  };

  private _init(): void {

  }

  private _render(): void {

  }

  private _buildMenu(): void {

  }

  private _hideButtons(numOfButtons: number): void {

  }

  private _showButtons(numOfButtons: number): void {

  }

  private _isButton(el: IconButtonComponent | ButtonComponent): el is IconButtonComponent {
    return (el as IconButtonComponent).localName === BUTTON_CONSTANTS.elementName;
  }

  private _isIconButton(el: IconButtonComponent | ButtonComponent): el is ButtonComponent {
    return (el as IconButtonComponent).localName === ICON_BUTTON_CONSTANTS.elementName;
  }

}
