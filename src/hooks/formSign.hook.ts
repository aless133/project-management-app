import { set } from 'store/userSlice';
import { useTranslation } from 'react-i18next';
import { useSignInMutation } from 'api/authApiSlice';
import { useState } from 'react';
import { IApiError, TErr, TValidator } from 'types';
import {
  isErrCheck,
  validatePassword,
  Constants,
  validateMinLength,
  validateMaxLength,
} from 'utils';
import { useStoreDispatch } from './store.hooks';

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

export const useFormSign = (isSignUp: boolean) => {
  const [t] = useTranslation();
  const [inValid, setInValid] = useState(false);
  const [errStack, setErrStack] = useState<TErr>(err);
  const [signin, { isLoading: isSigninLoading }] = useSignInMutation();
  // const [signup, { isLoading: isSignupLoading }] = useSignUpMutation();
  const dispatch = useStoreDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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

      const data = Object.fromEntries(formData.entries());

      if (isSignUp) {
        alert('later');
      } else {
        try {
          const signinData = await signin(data).unwrap();
          const parseData = parseJwt(signinData.token);
          dispatch(set({ token: signinData.token, id: parseData.userId, login: parseData.login }));
        } catch (err) {
          setErrStack({ submit: (err as IApiError).data.message });
          // console.log('eeeee', err);
        }
      }
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

  return { inValid, errStack, isSigninLoading, t, handleSubmit, handleChange };
};

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
