import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const goToNav = (path: string) => navigate(path);

  return goToNav;
};
