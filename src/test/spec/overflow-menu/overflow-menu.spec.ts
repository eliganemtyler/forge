import { IOverflowMenuTestContext, OVERFLOW_MENU_CONSTANTS, defineOverflowMenuComponent } from '@tylertech/forge';

interface ITestContext {
  context: IOverflowMenuTestContext;
}

interface IOverflowMenuTestContext {
  component: IOverflowMenuComponent;
  destroy(): void;
}

describe('OverflowMenuComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineOverflowMenuComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): IOverflowMenuTestContext {
    const component = document.createElement(OVERFLOW_MENU_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});