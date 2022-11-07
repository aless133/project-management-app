import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TErr, TValidator } from 'types';
import { Constants } from 'utils';
import { isErrCheck, validateMinLength, validateMaxLength, validatePassword } from 'utils';

const validator: TValidator = {
  [Constants.NAME]: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.LOGIN]: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.PASSWORD]: [validatePassword(Constants.PASSWORD_LENGTH)],
};

const err: TErr = {
  [Constants.NAME]: '',
  [Constants.LOGIN]: '',
  [Constants.PASSWORD]: '',
};

export const useFormSign = () => {
  const [t] = useTranslation();
  const [inValid, setInValid] = useState(false);
  const [errStack, setErrStack] = useState<TErr>(err);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      }
    }

    setErrStack({ ...err });

    if (!isErrCheck(err)) {
      setInValid(false);
    } else {
      setInValid(true);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (typeof value === 'string') {
      err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      setErrStack({ ...err });

      if (!isErrCheck(err)) {
        setInValid(false);
      } else {
        setInValid(true);
      }
    }
  };

  console.log(err);

  return { t, errStack, inValid, handleSubmit, handleChange };
};
