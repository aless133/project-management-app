import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreSelector, useStoreDispatch } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { IProtectedRuleProps } from 'types/protectedTypes';
import { Constants } from 'utils/constants';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';

export const ProtectedRuleBoardOwner: FC<IProtectedRuleProps> = ({ setCheck }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: board, isSuccess, isError, error } = useGetBoardQuery(id as string);
  const user = useStoreSelector(selectUser);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (isSuccess) {
      if (!!user && !!user.id && user.isChecked) {
        if (board.owner !== user.id) {
          navigate(Constants.MAIN, { replace: true });
        } else {
          setCheck(true);
        }
      }
    }
    if (isError) {
      navigate(Constants.MAIN, { replace: true });
      dispatch(alertError(getErrorMessage(error)));
    }
  }, [isSuccess, isError, board, user, navigate, setCheck, dispatch, error]);

  return null;
};
