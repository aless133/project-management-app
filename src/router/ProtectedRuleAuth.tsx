import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { IProtectedRuleProps } from 'types/protectedTypes';
import { Constants } from 'utils/constants';
import { useAppContext } from 'app.context';

interface IProtectedRuleAuth extends IProtectedRuleProps {
  userType: string;
}

export const ProtectedRuleAuth: FC<IProtectedRuleAuth> = ({ setCheck, userType }) => {
  const navigate = useNavigate();
  const user = useStoreSelector(selectUser);
  const { closeConfirm } = useAppContext();
  useEffect(() => {
    if (user.isChecked) {
      if (userType == 'guest') {
        if (user.isLogged) {
          setCheck(false);
          console.log('ProtectedRuleAuth navigate to MAIN');
          navigate(Constants.MAIN, { replace: true });
        } else {
          setCheck(true);
        }
      } else if (userType == 'user') {
        if (!user.isLogged) {
          setCheck(false);
          closeConfirm();
          console.log('ProtectedRuleAuth navigate to SIGN_IN');
          navigate(Constants.SIGN_IN, { replace: true });
        } else {
          setCheck(true);
        }
      }
    } else {
      setCheck(false);
    }
  }, [user.isChecked, user.isLogged, userType, navigate, setCheck, closeConfirm]);

  return null;
};
