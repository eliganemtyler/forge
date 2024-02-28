import { ForgeResizeObserverCallback, ICustomElementFoundation } from '@tylertech/forge-core';

import { IOverflowMenuAdapter } from './overflow-menu-adapter';
import { ICON_BUTTON_CONSTANTS, IconButtonComponent } from '../icon-button';
import { BUTTON_CONSTANTS, ButtonComponent } from '../button';

export interface IOverflowMenuFoundation extends ICustomElementFoundation {

}

export class OverflowMenuFoundation implements IOverflowMenuFoundation {
  private _slotListener: () => void;
  private _resizeObserverCallback: ForgeResizeObserverCallback;

  constructor(private _adapter: IOverflowMenuAdapter) {
    this._slotListener = () => this._onSlotChange();
    this._resizeObserverCallback = (entry: ResizeObserverEntry) => this._onResize(entry); // todo throttle?
  }

  public initialize(): void {
    this._adapter.addSlotChangeListener(this._slotListener);

  }

  public disconnect(): void {

  }

  private _onSlotChange(): void {
    console.log('slot change'); // contentchildren equivalent
  }

  private _onResize(entry: ResizeObserverEntry): void {

  }

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
