import '$src/shared';
import { randomTimeout } from '$src/utils/utils';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IListItemComponent, IMenuComponent, IMenuOption, ISwitchComponent } from '@tylertech/forge';
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

const overflowMenu = document.getElementById('overflow-menu');
const buttonA = document.getElementById('button-a');
const buttonB = document.getElementById('button-b');
const buttonC = document.getElementById('button-c');
const buttonD = document.getElementById('button-d');

const buttons = [buttonA, buttonB, buttonC, buttonD];

buttons.forEach(button => {
  button?.addEventListener('click', () => console.log(button.id));
});

function removeFromOverflowMenu(el: HTMLElement): void{
  el.remove();
}

function addToOverflowMenu(el: HTMLElement): void{
  overflowMenu.append(el);
}

// removeFromOverflowMenu(buttonA);
// addToOverflowMenu(buttonA);

function onButtonClick(str: string): void {
  console.log(str);
}
