import { signInInstance } from './axiosInstanse';

const getRefreshToken = async () => {
  try {
    const res = await signInInstance.post('api/auth/refresh');

    const { accessToken } = res.data;

    localStorage.setItem('ACCESS_TOKEN', accessToken);

    return true;
  } catch {
    localStorage.clear();

    window.location.href = '/login';

    return false;
  }
};

export default getRefreshToken;
