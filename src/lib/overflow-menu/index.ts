import { defineCustomElement } from '@tylertech/forge-core';

import { OverflowMenuComponent } from './overflow-menu';

export * from './overflow-menu-adapter';
export * from './overflow-menu-constants';
export * from './overflow-menu-foundation';
export * from './overflow-menu';

export function defineOverflowMenuComponent(): void {
  defineCustomElement(OverflowMenuComponent);
}
