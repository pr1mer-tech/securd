/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * Pyratzlabs API
 * Securd contracts
 * OpenAPI spec version: v1
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type { BorrowerPool, Borrower } from ".././schemas";

/**
 * API endpoint that shows BorrowerPool list
 */
export const borrowerPoolList = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<BorrowerPool[]>> => {
  return axios.get(`/borrower_pool/`, options);
};

export const getBorrowerPoolListQueryKey = () => [`/borrower_pool/`] as const;

export const getBorrowerPoolListQueryOptions = <
  TData = Awaited<ReturnType<typeof borrowerPoolList>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof borrowerPoolList>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryOptions<
  Awaited<ReturnType<typeof borrowerPoolList>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBorrowerPoolListQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof borrowerPoolList>>> =
    ({ signal }) => borrowerPoolList({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions };
};

export type BorrowerPoolListQueryResult = NonNullable<
  Awaited<ReturnType<typeof borrowerPoolList>>
>;
export type BorrowerPoolListQueryError = AxiosError<unknown>;

export const useBorrowerPoolList = <
  TData = Awaited<ReturnType<typeof borrowerPoolList>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof borrowerPoolList>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBorrowerPoolListQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows the positions in the different borrower pools
for a given user address.
 */
export const borrowerPoolBalancesRead = (
  userAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Borrower[]>> => {
  return axios.get(`/borrower_pool/balances/${userAddress}/`, options);
};

export const getBorrowerPoolBalancesReadQueryKey = (userAddress: string) =>
  [`/borrower_pool/balances/${userAddress}/`] as const;

export const getBorrowerPoolBalancesReadQueryOptions = <
  TData = Awaited<ReturnType<typeof borrowerPoolBalancesRead>>,
  TError = AxiosError<unknown>
>(
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolBalancesRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof borrowerPoolBalancesRead>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBorrowerPoolBalancesReadQueryKey(userAddress);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof borrowerPoolBalancesRead>>
  > = ({ signal }) =>
    borrowerPoolBalancesRead(userAddress, { signal, ...axiosOptions });

  return { queryKey, queryFn, enabled: !!userAddress, ...queryOptions };
};

export type BorrowerPoolBalancesReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof borrowerPoolBalancesRead>>
>;
export type BorrowerPoolBalancesReadQueryError = AxiosError<unknown>;

export const useBorrowerPoolBalancesRead = <
  TData = Awaited<ReturnType<typeof borrowerPoolBalancesRead>>,
  TError = AxiosError<unknown>
>(
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolBalancesRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBorrowerPoolBalancesReadQueryOptions(
    userAddress,
    options
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows BorrowerPool info
 */
export const borrowerPoolRead = (
  lpAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<BorrowerPool>> => {
  return axios.get(`/borrower_pool/${lpAddress}/`, options);
};

export const getBorrowerPoolReadQueryKey = (lpAddress: string) =>
  [`/borrower_pool/${lpAddress}/`] as const;

export const getBorrowerPoolReadQueryOptions = <
  TData = Awaited<ReturnType<typeof borrowerPoolRead>>,
  TError = AxiosError<unknown>
>(
  lpAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof borrowerPoolRead>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBorrowerPoolReadQueryKey(lpAddress);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof borrowerPoolRead>>> =
    ({ signal }) => borrowerPoolRead(lpAddress, { signal, ...axiosOptions });

  return { queryKey, queryFn, enabled: !!lpAddress, ...queryOptions };
};

export type BorrowerPoolReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof borrowerPoolRead>>
>;
export type BorrowerPoolReadQueryError = AxiosError<unknown>;

export const useBorrowerPoolRead = <
  TData = Awaited<ReturnType<typeof borrowerPoolRead>>,
  TError = AxiosError<unknown>
>(
  lpAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBorrowerPoolReadQueryOptions(lpAddress, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows Borrower info
 */
export const borrowerPoolBorrowerRead = (
  lpAddress: string,
  borrowerAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Borrower>> => {
  return axios.get(
    `/borrower_pool/${lpAddress}/borrower/${borrowerAddress}/`,
    options
  );
};

export const getBorrowerPoolBorrowerReadQueryKey = (
  lpAddress: string,
  borrowerAddress: string
) => [`/borrower_pool/${lpAddress}/borrower/${borrowerAddress}/`] as const;

export const getBorrowerPoolBorrowerReadQueryOptions = <
  TData = Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>,
  TError = AxiosError<unknown>
>(
  lpAddress: string,
  borrowerAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getBorrowerPoolBorrowerReadQueryKey(lpAddress, borrowerAddress);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>
  > = ({ signal }) =>
    borrowerPoolBorrowerRead(lpAddress, borrowerAddress, {
      signal,
      ...axiosOptions,
    });

  return {
    queryKey,
    queryFn,
    enabled: !!(lpAddress && borrowerAddress),
    ...queryOptions,
  };
};

export type BorrowerPoolBorrowerReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>
>;
export type BorrowerPoolBorrowerReadQueryError = AxiosError<unknown>;

export const useBorrowerPoolBorrowerRead = <
  TData = Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>,
  TError = AxiosError<unknown>
>(
  lpAddress: string,
  borrowerAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof borrowerPoolBorrowerRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBorrowerPoolBorrowerReadQueryOptions(
    lpAddress,
    borrowerAddress,
    options
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
