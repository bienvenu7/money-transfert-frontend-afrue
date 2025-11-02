export function getStatusCodeFromError(error: any): number {
  // Check for Axios error shape: error.response?.status
  if (error && error.response && typeof error.response.status === 'number') {
    return error.response.status;
  }
  // For fetch (native), the error may contain a 'status' or 'statusCode'
  if (typeof error.status === 'number') {
    return error.status;
  }
  if (typeof error.statusCode === 'number') {
    return error.statusCode;
  }
  // If no status code is found, return undefined
  return 500;
}

export function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return regex.test(password);
}

export const emailRegex = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};
