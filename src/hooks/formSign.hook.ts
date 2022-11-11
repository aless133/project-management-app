import { selectUser, setToken, setTokenLogged, updateUser } from 'store/userSlice';
import { useTranslation } from 'react-i18next';
import { useSignInMutation, useSignUpMutation } from 'api/authApiSlice';
import { TErr, TValidator, IApiError } from 'types';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { validateMinLength, Constants, validateMaxLength, isErrCheck } from 'utils';
import { useState } from 'react';
import { useUpdateUserMutation } from 'api/usersApiSlice';

const err: TErr = {
  name: '',
  login: '',
  password: '',
};

const validator: TValidator = {
  name: [validateMinLength(Constants.MIN_LENGTH), validateMaxLength(Constants.MAX_LENGTH)],
  login: [validateMinLength(Constants.MIN_LENGTH), validateMaxLength(Constants.MAX_LENGTH)],
  password: [validateMinLength(Constants.PASSWORD_LENGTH)],
};

export const useFormSign = (isSignUp: boolean) => {
  const [t] = useTranslation();
  const [errStack, setErrStack] = useState<TErr | Record<string, string>>({});
  const [signin, { isLoading: isSigninLoading }] = useSignInMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignUpMutation();
  const [updateUserDB] = useUpdateUserMutation();
  const dispatch = useStoreDispatch();

  //TODO
  const { id } = useStoreSelector(selectUser);

  const validateStack = (name: string, value: string) => {
    err[name] = validator[name].reduce((acc, fn) => acc + fn(value), '');

    return { ...err };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        setErrStack(validateStack(name, value));
      }
    }

    if (!isErrCheck(err)) {
      const data = Object.fromEntries(formData.entries());
      if (isSignUp) {
        try {
          const signupData = await signup(data).unwrap();
          console.log(signupData);
          const signinData = await signin({
            login: data.login,
            password: data.password,
          }).unwrap();
          dispatch(setTokenLogged(signinData.token));
        } catch (err) {
          setErrStack({ submit: (err as IApiError).data.message });
        }
      } else {
        try {
          const signinData = await signin(data).unwrap();
          dispatch(setToken(signinData.token));
        } catch (err) {
          setErrStack({ submit: (err as IApiError).data.message });
        }
      }
    }
  };

  const handleChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target as HTMLInputElement;

    setErrStack(validateStack(name, value));
  };

  const handleSubmitProfile: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        setErrStack(validateStack(name, value));
      }
    }

    if (id && !isErrCheck(err)) {
      const data = Object.fromEntries(formData.entries());
      const newUser = await updateUserDB({ id, data }).unwrap();
      dispatch(updateUser({ ...newUser }));
    }
  };

  return {
    errStack,
    isSigninLoading,
    isSignupLoading,
    handleSubmit,
    handleSubmitProfile,
    handleChange,
    t,
  };
};
