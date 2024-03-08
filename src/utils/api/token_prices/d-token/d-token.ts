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
import type { DToken, DTokenBalance } from ".././schemas";

/**
 * API endpoint that shows d_token info
 */
export const dTokenList = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<DToken[]>> => {
  return axios.get(`/d_token/`, options);
};

export const getDTokenListQueryKey = () => [`/d_token/`] as const;

export const getDTokenListQueryOptions = <
  TData = Awaited<ReturnType<typeof dTokenList>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof dTokenList>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryOptions<Awaited<ReturnType<typeof dTokenList>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getDTokenListQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof dTokenList>>> = ({
    signal,
  }) => dTokenList({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions };
};

export type DTokenListQueryResult = NonNullable<
  Awaited<ReturnType<typeof dTokenList>>
>;
export type DTokenListQueryError = AxiosError<unknown>;

export const useDTokenList = <
  TData = Awaited<ReturnType<typeof dTokenList>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof dTokenList>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getDTokenListQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows all d_token balances for a specific user
 */
export const dTokenBalancesRead = (
  userAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<DTokenBalance[]>> => {
  return axios.get(`/d_token/balances/${userAddress}/`, options);
};

export const getDTokenBalancesReadQueryKey = (userAddress: string) =>
  [`/d_token/balances/${userAddress}/`] as const;

export const getDTokenBalancesReadQueryOptions = <
  TData = Awaited<ReturnType<typeof dTokenBalancesRead>>,
  TError = AxiosError<unknown>
>(
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenBalancesRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof dTokenBalancesRead>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getDTokenBalancesReadQueryKey(userAddress);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof dTokenBalancesRead>>> =
    ({ signal }) =>
      dTokenBalancesRead(userAddress, { signal, ...axiosOptions });

  return { queryKey, queryFn, enabled: !!userAddress, ...queryOptions };
};

export type DTokenBalancesReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof dTokenBalancesRead>>
>;
export type DTokenBalancesReadQueryError = AxiosError<unknown>;

export const useDTokenBalancesRead = <
  TData = Awaited<ReturnType<typeof dTokenBalancesRead>>,
  TError = AxiosError<unknown>
>(
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenBalancesRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getDTokenBalancesReadQueryOptions(userAddress, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows d_token info
 */
export const dTokenRead = (
  dTokenAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<DToken>> => {
  return axios.get(`/d_token/${dTokenAddress}/`, options);
};

export const getDTokenReadQueryKey = (dTokenAddress: string) =>
  [`/d_token/${dTokenAddress}/`] as const;

export const getDTokenReadQueryOptions = <
  TData = Awaited<ReturnType<typeof dTokenRead>>,
  TError = AxiosError<unknown>
>(
  dTokenAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<Awaited<ReturnType<typeof dTokenRead>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getDTokenReadQueryKey(dTokenAddress);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof dTokenRead>>> = ({
    signal,
  }) => dTokenRead(dTokenAddress, { signal, ...axiosOptions });

  return { queryKey, queryFn, enabled: !!dTokenAddress, ...queryOptions };
};

export type DTokenReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof dTokenRead>>
>;
export type DTokenReadQueryError = AxiosError<unknown>;

export const useDTokenRead = <
  TData = Awaited<ReturnType<typeof dTokenRead>>,
  TError = AxiosError<unknown>
>(
  dTokenAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getDTokenReadQueryOptions(dTokenAddress, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * API endpoint that shows d_token balances
 */
export const dTokenBalanceRead = (
  dTokenAddress: string,
  userAddress: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<DTokenBalance>> => {
  return axios.get(
    `/d_token/${dTokenAddress}/balance/${userAddress}/`,
    options
  );
};

export const getDTokenBalanceReadQueryKey = (
  dTokenAddress: string,
  userAddress: string
) => [`/d_token/${dTokenAddress}/balance/${userAddress}/`] as const;

export const getDTokenBalanceReadQueryOptions = <
  TData = Awaited<ReturnType<typeof dTokenBalanceRead>>,
  TError = AxiosError<unknown>
>(
  dTokenAddress: string,
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenBalanceRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof dTokenBalanceRead>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getDTokenBalanceReadQueryKey(dTokenAddress, userAddress);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof dTokenBalanceRead>>> =
    ({ signal }) =>
      dTokenBalanceRead(dTokenAddress, userAddress, {
        signal,
        ...axiosOptions,
      });

  return {
    queryKey,
    queryFn,
    enabled: !!(dTokenAddress && userAddress),
    ...queryOptions,
  };
};

export type DTokenBalanceReadQueryResult = NonNullable<
  Awaited<ReturnType<typeof dTokenBalanceRead>>
>;
export type DTokenBalanceReadQueryError = AxiosError<unknown>;

export const useDTokenBalanceRead = <
  TData = Awaited<ReturnType<typeof dTokenBalanceRead>>,
  TError = AxiosError<unknown>
>(
  dTokenAddress: string,
  userAddress: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof dTokenBalanceRead>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getDTokenBalanceReadQueryOptions(
    dTokenAddress,
    userAddress,
    options
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
