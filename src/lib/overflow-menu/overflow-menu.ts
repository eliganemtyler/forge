import { CustomElement, attachShadowTemplate, ICustomElement } from '@tylertech/forge-core';
import { OverflowMenuAdapter } from './overflow-menu-adapter';
import { OverflowMenuFoundation } from './overflow-menu-foundation';
import { OVERFLOW_MENU_CONSTANTS } from './overflow-menu-constants';

import template from './overflow-menu.html';
import styles from './overflow-menu.scss';
import { IconButtonComponent } from '../icon-button';
import { MenuComponent } from '../menu';
import { TooltipComponent } from '../tooltip';
import { IconComponent, IconRegistry } from '../icon';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import { ButtonComponent } from '../button';

export interface IOverflowMenuComponent extends ICustomElement {
  reinitialize(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-overflow-menu': IOverflowMenuComponent;
  }
}

@CustomElement({
  name: OVERFLOW_MENU_CONSTANTS.elementName,
  dependencies: [
    MenuComponent,
    ButtonComponent,
    IconButtonComponent,
    IconComponent,
    TooltipComponent
  ]
})
export class OverflowMenuComponent extends HTMLElement implements IOverflowMenuComponent {
  public static get observedAttributes(): string[] {
    return [

    ];
  }

  private _foundation: OverflowMenuFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconMoreVert);
    attachShadowTemplate(this, template, styles);
    this._foundation = new OverflowMenuFoundation(new OverflowMenuAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  /** Recalculates the overflow menu breakpoints */
  public reinitialize(): void {
    this._foundation.init();
  }

}
