import Input from '../components/ui/input/Input';

export type FormInputConfig = {
  renderInput: (
    value: string,
    isValid: boolean,
    errorMessages: string[],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => JSX.Element;
  name: string;
  label: string;
  value: string;
  defaultValue: string;
  isValid: boolean;
  errorMessages: string[];
  isTouched: boolean;
};

export type InputValidationRule = {
  name: string;
  message: string;
  validate: (input: string) => boolean;
};

export type FormFieldConfig = FormInputConfig & { validations: InputValidationRule[] };

export type FormConfig = {
  [input: string]: FormFieldConfig;
};

export const createFormFieldConfig = (
  name: string,
  className: (isValid: boolean) => string,
  label: string,
  id: string,
  config: any = {},
  defaultValue: string = ''
): FormInputConfig => {
  return {
    renderInput: (
      value: string,
      isValid: boolean,
      errorMessages: string[],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    ) => (
      <Input
        key={id}
        name={name}
        id={id}
        className={className(isValid)}
        label={label}
        value={value}
        isValid={isValid}
        onChange={onChange}
        errorMessages={errorMessages}
        config={config}
      />
    ),
    name,
    label,
    value: defaultValue,
    defaultValue,
    isValid: false,
    errorMessages: [],
    isTouched: false,
  };
};

export const createInputValidationRule = (
  ruleName: string,
  message: string,
  validateFunction: (input: string) => boolean
): InputValidationRule => {
  return {
    name: ruleName,
    message,
    validate: validateFunction,
  };
};

export const requiredRule = (inputName: string): InputValidationRule => {
  return {
    name: 'required',
    message: `${inputName} is required`,
    validate: (inputValue) => inputValue.length > 0,
  };
};

export const minLengthRule = (inputName: string, minCharacters: number): InputValidationRule => {
  return {
    name: 'minLength',
    message: `${inputName} should contain at least ${minCharacters} characters`,
    validate: (inputValue) => inputValue.length >= minCharacters,
  };
};

export const maxLengthRule = (inputName: string, maxCharacters: number): InputValidationRule => {
  return {
    name: 'maxLength',
    message: `${inputName} cannot contain more than ${maxCharacters} characters`,
    validate: (inputValue) => inputValue.length <= maxCharacters,
  };
};
