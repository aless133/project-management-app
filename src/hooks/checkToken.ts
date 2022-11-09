import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserQuery } from 'api/usersApiSlice';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { clearUser, updateUser, selectIsLogged, selectUser } from 'store/userSlice';
import { Constants } from 'utils';

export const useCheckToken = () => {
  const isLogged = useStoreSelector(selectIsLogged);
  const user = useStoreSelector(selectUser);
  const [trigger, { data: userInfo, isError, isSuccess, error }] = useLazyGetUserQuery();
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (!isLogged && user.token) {
      trigger(user.id)
        .then((d) => {
          dispatch(updateUser({ isLogged: true, name: d.data.name }));
        })
        .catch((e) => {
          dispatch(clearUser());
        });
    }
  }, [isLogged, user]);
};
