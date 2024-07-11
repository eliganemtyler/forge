import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
import { OverflowMenuCore } from './overflow-menu-core';
import { OVERFLOW_MENU_CONSTANTS } from './overflow-menu-constants';

import template from './overflow-menu.html';
import styles from './overflow-menu.scss';
import { IconButtonComponent } from '../icon-button';
import { MenuComponent } from '../menu';
import { TooltipComponent } from '../tooltip';
import { IconComponent, IconRegistry } from '../icon';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import { ButtonComponent } from '../button';
import { BaseComponent } from '../core';
import { OverflowMenuAdapter } from './overflow-menu-adapter';

export interface IOverflowMenuComponent extends BaseComponent {
  reinitialize(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-overflow-menu': IOverflowMenuComponent;
  }
}

@customElement({
  name: OVERFLOW_MENU_CONSTANTS.elementName,
  dependencies: [MenuComponent, ButtonComponent, IconButtonComponent, IconComponent, TooltipComponent]
})
export class OverflowMenuComponent extends BaseComponent implements IOverflowMenuComponent {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _core: OverflowMenuCore;

  constructor() {
    super();
    IconRegistry.define(tylIconMoreVert);
    this._core = new OverflowMenuCore(new OverflowMenuAdapter(this));
    attachShadowTemplate(this, template, styles);
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }

  /** Recalculates the overflow menu breakpoints */
  public reinitialize(): void {
    this._core.init();
  }
}
