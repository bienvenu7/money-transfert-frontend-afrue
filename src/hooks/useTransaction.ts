import { createTransaction, getTransactionById } from '@/lib/transaction';
import type { ITrasanctionData } from '@/types/transaction';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateTransaction = (data: ITrasanctionData) => {
  const {
    isPending: isCreatingTransaction,
    isError: isCreatingTransactionError,
    data: transaction,
  } = useMutation({
    mutationKey: ['transaction', data],
    mutationFn: () => createTransaction(data),
  });
  return { transaction, isCreatingTransaction, isCreatingTransactionError };
};

export const useGetTransactonById = (id: string) => {
  const {
    isPending: isGettingTransaction,
    isError: isTransactionError,
    data: transaction,
  } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  });
  return { transaction, isGettingTransaction, isTransactionError };
};
