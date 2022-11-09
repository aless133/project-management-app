import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserQuery } from 'api/usersApiSlice';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { clear, update, selectIsLogged, selectUser } from 'store/userSlice';
import { Constants } from 'utils';

export const useCheckLocalUser = () => {
  // const navigate = useNavigate();
  const isLogged = useStoreSelector(selectIsLogged);
  const user = useStoreSelector(selectUser);
  const [trigger, { data: userInfo, isError, isSuccess, error }] = useLazyGetUserQuery();
  // const [skip, setSkip] = useState<boolean>(true);
  // const user = useStoreSelector(selectUser);
  const dispatch = useStoreDispatch();
  // const { data: userInfo, error, isError } = useGetUserQuery(user.id, { skip });
  useEffect(() => {
    // console.log(user);
    if (!isLogged && user.token) {
      trigger(user.id)
        .then((d) => {
          // console.log(d);
          dispatch(update({ isLogged: true, name: d.data.name }));
        })
        .catch((e) => {
          dispatch(clear({}));
        });
      // setSkip(false);
      // console.log(userInfo);
      // dispatch(get()).unwrap();
    }
  }, [isLogged, user]);
  // useEffect(() => {
  //   console.log(userInfo, isError, error);
  //   if (isError) navigate(Constants.HOME);
  // }, [userInfo, isError]);
};
