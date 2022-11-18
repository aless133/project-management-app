import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser, selectIsLogged } from 'store/userSlice';
import { IProtectedRuleProps } from 'types/protectedTypes';
import { Constants } from 'utils/constants';

interface IProtectedRuleAuth extends IProtectedRuleProps {
  userType: string;
}

export const ProtectedRuleAuth: FC<IProtectedRuleAuth> = ({ setCheck, userType }) => {
  const navigate = useNavigate();
  const user = useStoreSelector(selectUser);
  useEffect(() => {
    if (user.isChecked) {
      if (userType == 'guest') {
        if (user.isLogged) {
          setCheck(false);
          console.log('ProtectedRuleAuth navigate to main');
          navigate(Constants.MAIN, { replace: true });
        } else {
          setCheck(true);
        }
      } else if (userType == 'user') {
        if (!user.isLogged) {
          setCheck(false);
          console.log('ProtectedRuleAuth navigate to signin');
          navigate(Constants.SIGN_IN, { replace: true });
        } else {
          setCheck(true);
        }
      }
    } else {
      setCheck(false);
    }
  }, [user.isChecked, user.isLogged, userType]);

  return null;
};