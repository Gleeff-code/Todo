import { api } from '@/api/instance';

interface SignUpParams {
  email: string;
  password: string;
}

type PostSignUpConfig = AxiosRequestConfig<SignUpParams>;

export const postSignUp = async ({ params, config }: PostSignUpConfig) =>
  api.post<string>('InternalLogin/sign-up', params, config);
