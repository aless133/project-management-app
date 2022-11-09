import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectIsLogged } from 'store/userSlice';
import { Constants } from 'utils';

export const useCheckAccess = (access: string) => {
  const navigate = useNavigate();
  const isLogged = useStoreSelector(selectIsLogged);

  useEffect(() => {
    // let navigated = false;
    if (access == 'guest' && isLogged) {
      // navigated = true;
      navigate(Constants.MAIN, { replace: true });
    }
    if (access == 'user' && !isLogged) {
      // navigated = true;
      navigate(Constants.SIGN_IN, { replace: true });
    }
  }, [isLogged]);
  // return { navigated };
};
