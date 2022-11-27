import { clearUser, selectUser, setToken, setTokenLogged, updateUser } from 'store/userSlice';
import { useSignInMutation, useSignUpMutation } from 'api/authApiSlice';
import { TErr, TValidator, IApiError } from 'types';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { validateMinLength, Constants, validateMaxLength, isErrCheck } from 'utils';
import { useState, FormEvent } from 'react';
import { useDeleteUserMutation, useUpdateUserMutation } from 'api/usersApiSlice';
import { alertError, alertSuccess } from 'store/uiSlice';
import { getErrorMessage, validateLogin, validatePassword } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';

const err: TErr = {
  name: '',
  login: '',
  password: '',
};

const validator: TValidator = {
  name: [validateMinLength(Constants.MIN_LENGTH), validateMaxLength(Constants.MAX_LENGTH)],
  login: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
    validateLogin(Constants.LOGIN_RULE),
  ],
  password: [
    validateMinLength(Constants.PASSWORD_LENGTH),
    validatePassword(Constants.PASSWORD_RULE),
  ],
};

export const useFormSign = (isSignUp: boolean) => {
  const [errStack, setErrStack] = useState<TErr | Record<string, string>>({});
  const [signin, { isLoading: isSigninLoading }] = useSignInMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignUpMutation();
  const [updateUserDB, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteLoad }] = useDeleteUserMutation();
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const isSignInLoad = isSigninLoading;
  const isSignUpLoad = isSignupLoading;
  const isUpdateLoad = isUpdateLoading;
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
          //const signupData =
          await signup(data).unwrap();
          const signinData = await signin({
            login: data.login,
            password: data.password,
          }).unwrap();
          dispatch(setTokenLogged(signinData.token));
          dispatch(updateUser({ name: data.name })); ///after token!
        } catch (err) {
          const err1 = (err as IApiError).data.message;
          setErrStack({ submit: err1 });
          dispatch(alertError(getErrorMessage(err)));
        }
      } else {
        try {
          const signinData = await signin(data).unwrap();
          dispatch(setToken(signinData.token));
        } catch (err) {
          const err1 = (err as IApiError).data.message;
          setErrStack({ submit: err1 });
          dispatch(alertError(getErrorMessage(err)));
        }
      }
    }
  };

  const handleChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === Constants.TASK_DESCRIPTION && (!value || value.length < 2)) {
      setErrStack({ ...err, [Constants.TASK_DESCRIPTION]: '2' });
    } else {
      setErrStack({});
    }

    name !== Constants.TASK_DESCRIPTION && setErrStack(validateStack(name, value));
  };

  const handleSubmitProfile: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      for (const [name, value] of formData.entries()) {
        if (typeof value === 'string') {
          setErrStack(validateStack(name, value));
        }
      }

      if (!isErrCheck(err)) {
        const data = Object.fromEntries(formData.entries());
        const newUser = id && (await updateUserDB({ id, data }).unwrap());
        dispatch(updateUser({ ...newUser }));
        navigate(Constants.MAIN, { replace: true });
        dispatch(alertSuccess());
      }
    } catch (err) {
      dispatch(alertError(getErrorMessage(err)));
    }
  };

  const getFieldsColumn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        if (name === Constants.TASK_DESCRIPTION && (!value || value.length < 2)) {
          setErrStack({ ...err, [Constants.TASK_DESCRIPTION]: '2' });
        } else if (name !== Constants.TASK_DESCRIPTION) {
          setErrStack(validateStack(name, value));
        }
      }
    }

    if (!isErrCheck(err)) {
      return Object.fromEntries(formData.entries()) as {
        name: string;
        login?: string;
        taskDescription?: string;
      };
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteUser(id).unwrap();
    dispatch(clearUser());
    return res;
  };

  return {
    errStack,
    isSigninLoading,
    isSignupLoading,
    handleSubmit,
    handleSubmitProfile,
    handleChange,
    isSignInLoad,
    isSignUpLoad,
    isUpdateLoad,
    isDeleteLoad,
    handleDelete,
    getFieldsColumn,
  };
};
