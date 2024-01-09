import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { Density, Theme } from '../constants';
import { BaseComponent, IBaseComponent } from '../core';
import { FieldAdapter } from './field-adapter';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldTheme, FieldVariant, FIELD_CONSTANTS } from './field-constants';
import { FieldFoundation } from './field-foundation';

import template from './field.html';
import styles from './field.scss';

export interface IFieldComponent extends IBaseComponent {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  density: FieldDensity;
  dense: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-field': IFieldComponent;
  }
}

/**
 * @tag forge-field
 * 
 * @summary The Forge Field component is a basic component that handles the layout and theming of
 * form elements that can include a label, various states, and a border around an input area.
 * 
 * @property {FieldLabelPosition} labelPosition - The position of the label relative to the input area.
 * @property {FieldLabelAlignment} labelAlignment - The alignment of the label relative to the input area.
 * @property {boolean} invalid - Whether the field is in an invalid state.
 * @property {boolean} required - Whether the field is required.
 * @property {boolean} optional - Whether the field is optional.
 * @property {boolean} disabled - Whether the field is disabled.
 * @property {FieldVariant} variant - The variant of the field.
 * @property {FieldTheme} theme - The theme of the field.
 * @property {FieldDensity} density - The density of the field.
 * @property {boolean} dense - Whether the field is at the "small" density level.
 * 
 * @attribute {FieldLabelPosition} label-position - The position of the label relative to the input area.
 * @attribute {FieldLabelAlignment} label-alignment - The alignment of the label relative to the input area.
 * @attribute {boolean} invalid - Whether the field is in an invalid state.
 * @attribute {boolean} required - Whether the field is required.
 * @attribute {boolean} optional - Whether the field is optional.
 * @attribute {boolean} disabled - Whether the field is disabled.
 * @attribute {FieldVariant} variant - The variant of the field.
 * @attribute {FieldTheme} theme - The theme of the field.
 * @attribute {Density} density - The density of the field.
 * @attribute {boolean} dense - Whether the field is at the "small" density level.
 */

@CustomElement({
  name: FIELD_CONSTANTS.elementName
})
export class FieldComponent extends BaseComponent implements IFieldComponent {
  public static get observedAttributes(): string[] {
    return [
      FIELD_CONSTANTS.attributes.LABEL_POSITION,
      FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT,
      FIELD_CONSTANTS.attributes.INVALID,
      FIELD_CONSTANTS.attributes.REQUIRED,
      FIELD_CONSTANTS.attributes.OPTIONAL,
      FIELD_CONSTANTS.attributes.DISABLED,
      FIELD_CONSTANTS.attributes.VARIANT,
      FIELD_CONSTANTS.attributes.THEME,
      FIELD_CONSTANTS.attributes.DENSITY,
      FIELD_CONSTANTS.attributes.DENSE
    ];
  }

  private _foundation: FieldFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FieldFoundation(new FieldAdapter(this));
  }

  public connectedCallback(): void {
    // TODO: implement something here or remove this
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FIELD_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as FieldLabelPosition;
        break;
      case FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT:
        this.labelAlignment = newValue as FieldLabelAlignment;
        break;
      case FIELD_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.OPTIONAL:
        this.optional = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as FieldVariant;
        break;
      case FIELD_CONSTANTS.attributes.THEME:
        this.theme = newValue as FieldTheme;
        break;
      case FIELD_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FieldDensity;
        break;
      case FIELD_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare labelPosition: FieldLabelPosition;

  @FoundationProperty()
  public declare labelAlignment: FieldLabelAlignment;

  @FoundationProperty()
  public declare invalid: boolean;

  @FoundationProperty()
  public declare required: boolean;

  @FoundationProperty()
  public declare optional: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare variant: FieldVariant;

  @FoundationProperty()
  public declare theme: FieldTheme;

  @FoundationProperty()
  public declare density: FieldDensity;

  @FoundationProperty()
  public declare dense: boolean;
}
