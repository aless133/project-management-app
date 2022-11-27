import { useEffect, useState } from 'react';
import { useLazyGetUserQuery } from 'api/usersApiSlice';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { clearUser, updateUser, selectUser } from 'store/userSlice';

export const useCheckToken = () => {
  const [isChecking, setChecking] = useState(true);
  const user = useStoreSelector(selectUser);
  const [trigger] = useLazyGetUserQuery();
  const dispatch = useStoreDispatch();
  useEffect(() => {
    console.log('useCheckToken', user);
    if (!user.isChecked && user.token) {
      setChecking(true);
      trigger(user.id)
        .then((d) => {
          dispatch(updateUser({ name: d.data.name, isLogged: true, isChecked: true }));
        })
        .catch(() => {
          dispatch(clearUser());
        })
        .finally(() => {
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [user, trigger, dispatch]);
  return { isChecking };
};
