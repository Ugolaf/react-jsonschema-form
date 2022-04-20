/// <reference types="react" />
/// <reference types="@rjsf/core" />
declare const ThemeCommon: {
    ArrayFieldTemplate: (props: import("@rjsf/core").ArrayFieldTemplateProps<any>) => JSX.Element;
    fields: {
        DescriptionField: ({ description }: import("@rjsf/core").FieldProps<any>) => JSX.Element | null;
        TitleField: ({ title }: import("@rjsf/core").FieldProps<any>) => JSX.Element;
    };
    FieldTemplate: ({ id, children, classNames, disabled, displayLabel, hidden, label, onDropPropertyClick, onKeyChange, readonly, required, rawErrors, rawHelp, rawDescription, schema, }: import("@rjsf/core").FieldTemplateProps<any>) => JSX.Element;
    ObjectFieldTemplate: ({ DescriptionField, description, TitleField, title, properties, required, disabled, readonly, uiSchema, idSchema, schema, formData, onAddClick, }: import("@rjsf/core").ObjectFieldTemplateProps<any>) => JSX.Element;
    widgets: {
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
    ErrorList: ({ errors }: import("@rjsf/core").ErrorListProps) => JSX.Element;
};
export default ThemeCommon;
