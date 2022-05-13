import { useCallback, useState } from 'react';

import { FormConfig, FormFieldConfig, getChangeEventValue } from '../lib/form-util';

const updateInput = (input: FormFieldConfig, value: string) => {
  input.value = value;
  input.isTouched = true;

  input.errorMessages = [];
  const isValid = input.validations.reduce((result, validation) => {
    const isValid = validation.validate(input.value);
    if (!isValid) {
      input.errorMessages.push(validation.message);
    }
    return result && isValid;
  }, true);
  if (isValid && !input.isValid) {
    input.isValid = true;
  } else if (!isValid && input.isValid) {
    input.isValid = false;
  }

  return input;
};

const useForm = (formConfig: FormConfig) => {
  const [form, setForm] = useState(formConfig);

  const renderInputs = () =>
    Object.values(form).map((input) => {
      const { value, isTouched, isValid, errorMessages } = input;
      return input.renderInput(value, !isTouched || isValid, errorMessages, onInputChange);
    });

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const input = updateInput({ ...form[name] }, getChangeEventValue(event));
      setForm((oldForm) => {
        return { ...oldForm, [name]: input };
      });
    },
    [form]
  );

  const updateFormValues = useCallback(
    (values: { [name: string]: string }) => {
      const newForm = { ...form };
      Object.entries(values)
        .filter(([key]) => Object.keys(newForm).includes(key))
        .map(([key, value]) => updateInput(newForm[key], value))
        .forEach((input) => (newForm[input.name] = input));
      setForm(newForm);
    },
    [form]
  );

  const isFormValid = useCallback(
    () =>
      Object.values(form).reduce(
        (validity, formInput) =>
          (!formInput.validations.find((valiadtion) => valiadtion.name === 'required') ||
            formInput.isValid) &&
          validity,
        true
      ),
    [form]
  );

  const getFormValues = useCallback(
    () =>
      Object.entries(form).reduce((values, [key, input]) => {
        return { ...values, [key]: input.value };
      }, {}),
    [form]
  );

  const resetForm = useCallback(() => {
    const formValues = getFormValues();

    const newForm = { ...form };
    Object.values(newForm).forEach((input) => {
      input.value = input.defaultValue;
      input.isValid = false;
      input.errorMessages = [];
      input.isTouched = false;
    });
    setForm(newForm);

    return formValues;
  }, [form]);

  return { renderInputs, isFormValid, getFormValues, resetForm, updateFormValues };
};

export default useForm;
