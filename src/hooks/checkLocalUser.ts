import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useLazyGetUserQuery } from 'api/usersApiSlice';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { set, selectIsLogged, selectUser } from 'store/userSlice';

export const useCheckLocalUser = () => {
  const navigate = useNavigate();
  const user = useStoreSelector(selectUser);
  const [trigger, { data: userInfo, isError, isSuccess, error }] = useLazyGetUserQuery();
  // const [skip, setSkip] = useState<boolean>(true);
  // const user = useStoreSelector(selectUser);
  // const dispatch = useStoreDispatch();
  // const { data: userInfo, error, isError } = useGetUserQuery(user.id, { skip });
  useEffect(() => {
    console.log(user);
    if (!user.isLogged && user.token) {
      trigger(user.token);
      // setSkip(false);
      // console.log(userInfo);
      // dispatch(get()).unwrap();
    }
  }, [user]);
  useEffect(() => {
    console.log(userInfo, isError, error);
    if (isError) navigate('/asd');
  }, [userInfo, isError]);
};
