import { BUTTON_CONSTANTS, ButtonComponent } from '../button';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { ICON_BUTTON_CONSTANTS, IconButtonComponent } from '../icon-button';

const elementName = `${COMPONENT_NAME_PREFIX}overflow-menu`;

const classes = {
  ROOT: 'forge-overflow-menu',
  CONTENT: 'forge-overflow-menu__content',
  MENU_BUTTON: 'forge-overflow-menu__menu-button',
  MENU: 'forge-overflow-menu__menu'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  CONTENT: `.${classes.CONTENT}`,
  CONTENT_SLOT: `.${classes.ROOT} > slot`,
  MENU_BUTTON: `.${classes.MENU_BUTTON}`,
  MENU: `.${classes.MENU}`,
  BUTTONS: `${BUTTON_CONSTANTS.elementName}, ${ICON_BUTTON_CONSTANTS.elementName}`
};

export const OVERFLOW_MENU_CONSTANTS = {
  elementName,
  classes,
  selectors
};

export interface IOverflowMenuButton {
  element: IconButtonComponent | ButtonComponent;
  overflow: boolean;
};
