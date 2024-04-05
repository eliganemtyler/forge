import { ForgeResizeObserverCallback, ICustomElementFoundation } from '@tylertech/forge-core';

import { IOverflowMenuAdapter } from './overflow-menu-adapter';
import { ICON_BUTTON_CONSTANTS, IconButtonComponent } from '../icon-button';
import { BUTTON_CONSTANTS, ButtonComponent } from '../button';
import { IMenuOption, MenuOptionFactory } from '../menu';
import { IOverflowMenuButton } from './overflow-menu-constants';

export interface IOverflowMenuFoundation extends ICustomElementFoundation {

}

export class OverflowMenuFoundation implements IOverflowMenuFoundation {
  private _options: IMenuOption[] = [];
  private _filteredOptions: MenuOptionFactory;
  private _buttons: IOverflowMenuButton[] = [];
  private _breakpoints: number[] = [];
  private _hiddenCount = 0;
  private _slotChangeListener: () => void;
  private _resizeObserverCallback: ForgeResizeObserverCallback;

  constructor(private _adapter: IOverflowMenuAdapter) {
    this._slotChangeListener = () => this._onSlotChange();
    this._resizeObserverCallback = (entry: ResizeObserverEntry) => this._onResize(entry); // todo throttle? probably not
    this._filteredOptions = () => this._options.filter(option => { return this._buttons[option.value].overflow === true; });
  }

  public initialize(): void {
    this._adapter.addSlotChangeListener(this._slotChangeListener);
    this._adapter.observeDisabled(this._onDisable);
  }

  public disconnect(): void {

  }


  private _onSlotChange(): void {
    console.log('slot change'); // contentchildren equivalent
    this.init();
  }

  private _onResize(entry: ResizeObserverEntry): void {
    console.log('on resize');
    this._render();
  }

  private _onDisable: MutationCallback = (mutations: MutationRecord[], observer: MutationObserver) => {
    console.log('on mutate');
    // todo optimize to update only the relevant property of the relevant menu option (currently just observing disabled via attributefilter)
    this._buildMenu(this._adapter.slottedButtons);
  };

  public init(): void {
    this._adapter.unobserveResize();
    this._breakpoints = [];
    this._buttons = [];
    this._hiddenCount = 0;

    // Get menu element width
    this._adapter.showElement(this._adapter.menuButtonElement);
    const menuWidth = this._calculatedWidth(this._adapter.menuButtonElement);
    this._adapter.hideElement(this._adapter.menuButtonElement);

    // Get array of projected button elements
    const buttons = this._adapter.slottedButtons;

    // Edge case: if no buttons, component does not need to set breakpoints or observe resize
    if (!buttons.length) {
      return;
    }

    // Edge case: if only one button, <= to menu button size, same as previous edge case but make sure this button is visible
    if (buttons.length === 1 && this._calculatedWidth(buttons[0]) <= menuWidth) {
      this._adapter.showElement(buttons[0]);
      return;
    }

    this._buildMenu(buttons);

    // All buttons need to be visible while breakpoints calculating
    buttons.forEach(button => {
      this._adapter.showElement(button);
    });

    // Set breakpoints from largest to smallest
    let x = menuWidth;
    for (const button of buttons) {
      // If the button display is none, get the width as if it were visible
      button.style.display = 'block';
      x += this._calculatedWidth(button);
      this._breakpoints.unshift(x);
      this._buttons.unshift({
        element: button,
        overflow: false
      });
    }

    // First breakpoint accounts for menu width
    this._breakpoints[0] -= menuWidth;

    console.log('breakpoints: ');
    console.log(this._breakpoints);

    this._adapter.setMenuOptions(this._filteredOptions);

    this._adapter.observeResize(this._resizeObserverCallback);
  }

  private _render(): void {
    const containerWidth = this._adapter.hostElement.offsetWidth; // todo check this is right element

    let i = 0;

    while (this._breakpoints[i] >= containerWidth) {
      i += 1;
    }

    // If i has changed since last observe, update the view
    if (i !== this._hiddenCount) {

      // Display the menu if we are hiding any buttons
      if (i === 0) {
        this._adapter.hideElement(this._adapter.menuButtonElement);
      }
      else {
        this._adapter.showElement(this._adapter.menuButtonElement);
      }

      // Hide or show new elements as necessary
      if (i > this._hiddenCount) {
        const numberToHide = i - this._hiddenCount;
        this._hideButtons(numberToHide);
        this._hiddenCount = i;
      }
      if (i < this._hiddenCount) {
        const numberToShow = this._hiddenCount - i;
        this._showButtons(numberToShow);
        this._hiddenCount = i;
      }
    }
  }

  private _buildMenu(buttons: IOverflowMenuButton['element'][]): void {
    this._options = [];
    buttons.forEach((item, i) => {

      // Set a value for the button based on the index of the buttons array
      // The buttons array lists the buttons in the order they will be hidden (right-to-left)
      const value = buttons.length - i - 1;

      const el = item;
      let menuOption: IMenuOption | undefined;

      if (this._isIconButton(el)) {
        menuOption = {
          leadingIconType: 'component',
          leadingIcon: el.getElementsByTagName('forge-icon')[0]?.name ?? '',
          label: el.getElementsByTagName('forge-tooltip')[0]?.innerText ?? '',
          value,
          disabled: el.getElementsByTagName('button')[0]?.disabled ?? false
        };
      }

      else if (this._isButton(el)) {
        menuOption = {
          leadingIconType: 'component',
          leadingIcon: el.getElementsByTagName('forge-icon')[0]?.name ?? '',
          label: el.getElementsByTagName('button')[0]?.innerText ?? '',
          value,
          disabled: el.getElementsByTagName('button')[0]?.disabled ?? false
        };
      }

      if (menuOption) {
        this._options.push(menuOption);
      }
    });
  }

  private _isButton(el: IconButtonComponent | ButtonComponent): el is IconButtonComponent {
    return (el as IconButtonComponent).localName === BUTTON_CONSTANTS.elementName;
  }

  private _isIconButton(el: IconButtonComponent | ButtonComponent): el is ButtonComponent {
    return (el as IconButtonComponent).localName === ICON_BUTTON_CONSTANTS.elementName;
  }

  // Get the width of the button including horizontal margin and padding
  private _calculatedWidth(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    return element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  private _showButtons(numOfButtons: number): void {
    for (let j = 0; j < numOfButtons; j++) {
      this._showButton(this._buttons[this._hiddenCount - 1 - j]);
    }
  }

  private _hideButtons(numOfButtons: number): void {
    for (let j = this._hiddenCount; j < numOfButtons + this._hiddenCount; j++) {
      this._hideButton(this._buttons[j]);
    }
  }

  private _hideButton(button: IOverflowMenuButton): void {
    button.overflow = true;
    this._adapter.hideElement(button.element);
  }

  private _showButton(button: IOverflowMenuButton): void {
    button.overflow = false;
    this._adapter.showElement(button.element);
  }

}
