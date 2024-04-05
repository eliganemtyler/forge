import '$src/shared';
import { randomTimeout } from '$src/utils/utils';
import { IconRegistry } from '@tylertech/forge/icon';
import type { ButtonComponent, IListItemComponent, IMenuComponent, IMenuOption, IOverflowMenuComponent, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/menu';
import '@tylertech/forge/divider';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import { tylIconAlphaACircleOutline, tylIconAlphaBCircleOutline, tylIconAlphaCCircleOutline, tylIconAlphaDCircleOutline, tylIconAlphaECircleOutline } from '@tylertech/tyler-icons/extended';
import '@tylertech/forge/button';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/overflow-menu';
import '@tylertech/forge/split-view';
import '@tylertech/forge/card';
import '@tylertech/forge/toolbar';
import './overflow-menu.scss';

IconRegistry.define([
  tylIconAlphaACircleOutline,
  tylIconAlphaBCircleOutline,
  tylIconAlphaCCircleOutline,
  tylIconAlphaDCircleOutline,
  tylIconAlphaECircleOutline
]);

const overflowMenu = document.getElementById('overflow-menu') as IOverflowMenuComponent;
const buttonA = document.getElementById('button-a');
const buttonB = document.getElementById('button-b');
const buttonC = document.getElementById('button-c');
const buttonD = document.getElementById('button-d');
const buttons = [buttonA, buttonB, buttonC, buttonD];

const showA = document.getElementById('show-a');
const showB = document.getElementById('show-b');
const showC = document.getElementById('show-c');
const showD = document.getElementById('show-d');
const showCBs = [showA, showB, showC, showD];
const useMargin = document.getElementById('use-margin');
const usePadding = document.getElementById('use-padding');
const disableA = document.getElementById('disable-a');
const disableB = document.getElementById('disable-b');
const disableC = document.getElementById('disable-c');
const disableD = document.getElementById('disable-d');
const disableCBs = [disableA, disableB, disableC, disableD];

const reinitButton = document.getElementById('opt-reinit') as HTMLButtonElement;
reinitButton.addEventListener('click', evt => {
  overflowMenu.reinitialize();
});


buttons.forEach((button, i) => {

  showCBs[i].addEventListener('change', (evt: Event) => {
    const checked = (evt.target as HTMLInputElement).checked;
    if (checked) {
      overflowMenu.append(button);
    }
    else {
      button.remove();
    }

  });

  disableCBs[i].addEventListener('change', (evt: Event) => {
    const checked = (evt.target as HTMLInputElement).checked;
    const htmlButton = button.getElementsByTagName('button')[0];
    htmlButton.disabled = checked;
  });

  useMargin.addEventListener('change', (evt: Event) => {
    const checked = (evt.target as HTMLInputElement).checked;
    if (checked) {
      overflowMenu.classList.add('use-margin');
    }
    else {
      overflowMenu.classList.remove('use-margin');
    }
  });

  usePadding.addEventListener('change', (evt: Event) => {
    const checked = (evt.target as HTMLInputElement).checked;
    if (checked) {
      overflowMenu.classList.add('use-padding');
    }
    else {
      overflowMenu.classList.remove('use-padding');
    }
  });

});

buttons.forEach(button => {
  button?.addEventListener('click', () => console.log(button.id));
});
