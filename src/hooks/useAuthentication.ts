import { confirmOtp, login } from '@/lib/auth';
import { useMutation } from '@tanstack/react-query';

export const useAuthentication = (email: string, password: string) => {
  const {
    mutateAsync: postLogin,
    isPending: isLogin,
    isError: loginError,
  } = useMutation({
    mutationKey: ['login', email],
    mutationFn: () => login(email, password),
  });
  return { postLogin, isLogin, loginError };
};

export const useOptCheck = (email: string, newOtp: string[]) => {
  const {
    mutateAsync: postOtp,
    isPending: lodingOtp,
    isError: otpError,
    isSuccess: successOtp,
  } = useMutation({
    mutationKey: ['login', email],
    mutationFn: () => confirmOtp(email, newOtp),
  });
  return { postOtp, lodingOtp, otpError, successOtp };
};
