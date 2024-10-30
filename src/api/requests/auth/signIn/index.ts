import { api } from '@/api/instance';

interface SignInParams {
  username: string;
  password: string;
}

interface SignInResponse {
  userId: string | null;
  accessToken: string;
}

type PostSignInConfig = AxiosRequestConfig<SignInParams>;

export const postSignIn = async ({ params, config }: PostSignInConfig) =>
  api.post<SignInResponse>('InternalLogin', { ...params, state: 'Internal' }, config);
