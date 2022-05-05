import { useCallback, useState } from 'react';

import { FormConfig, getChangeEventValue } from '../../lib/form-util';

const useForm = (formConfig: FormConfig) => {
  const [form, setForm] = useState(formConfig);

  const renderForm = () =>
    Object.values(form).map((input) => {
      const { value, isTouched, isValid, errorMessages } = input;
      return input.renderInput(value, !isTouched || isValid, errorMessages, onInputChange);
    });

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const input = { ...form[name] };
      input.value = getChangeEventValue(event);
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

      input.isTouched = true;
      setForm({ ...form, [name]: input });
    },
    [form]
  );

  const isFormValid = useCallback(
    () => Object.values(form).reduce((validity, formInput) => formInput.isValid && validity, true),
    [form]
  );

  const resetForm = () => {
    const formValues = Object.entries(form).reduce((values, [key, input]) => {
      return { ...values, [key]: input.value };
    }, {});

    const newForm = { ...form };
    Object.values(newForm).forEach((input) => {
      input.value = input.defaultValue;
      input.isValid = false;
      input.errorMessages = [];
      input.isTouched = false;
    });
    setForm(newForm);

    return formValues;
  };

  return [renderForm, isFormValid, resetForm];
};

export default useForm;
