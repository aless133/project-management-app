import { useEffect } from 'react';
import { useLazyGetUserQuery } from 'api/usersApiSlice';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { clearUser, updateUser, selectIsLogged, selectUser } from 'store/userSlice';

export const useCheckToken = () => {
  const isLogged = useStoreSelector(selectIsLogged);
  const user = useStoreSelector(selectUser);
  const [trigger] = useLazyGetUserQuery();
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (!isLogged && user.token) {
      trigger(user.id)
        .then((d) => {
          dispatch(updateUser({ isLogged: true, name: d.data.name }));
        })
        .catch(() => {
          dispatch(clearUser());
        });
    }
  }, [trigger, dispatch, isLogged, user]);
};
