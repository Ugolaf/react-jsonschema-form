/// <reference types="react" />
/// <reference types="@rjsf/core" />
declare const _default: {
    CheckboxWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    CheckboxesWidget: ({ schema, label, id, disabled, options, value, autofocus, readonly, required, onChange, onBlur, onFocus, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    ColorWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    DateWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    DateTimeWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    EmailWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    PasswordWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    RadioWidget: ({ id, schema, options, value, required, disabled, readonly, label, onChange, onBlur, onFocus, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    RangeWidget: ({ value, readonly, disabled, onBlur, onFocus, options, schema, onChange, required, label, id, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    SelectWidget: ({ schema, id, options, label, required, disabled, readonly, value, multiple, autofocus, onChange, onBlur, onFocus, rawErrors, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    TextareaWidget: ({ id, placeholder, value, required, disabled, autofocus, label, readonly, onBlur, onFocus, onChange, options, schema, rawErrors, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    TextWidget: ({ id, placeholder, required, readonly, disabled, type, label, value, onChange, onBlur, onFocus, autofocus, options, schema, uiSchema, rawErrors, formContext, registry, ...textFieldProps }: import("@rjsf/core").WidgetProps) => JSX.Element;
    UpDownWidget: ({ id, required, readonly, disabled, label, value, onChange, onBlur, onFocus, autofocus, }: import("@rjsf/core").WidgetProps) => JSX.Element;
    URLWidget: (props: import("@rjsf/core").WidgetProps) => JSX.Element;
    SubmitButton: import("react").FC<import("@rjsf/core").WidgetProps>;
};
export default _default;
