/* tslint:disable */
/* eslint-disable */
/**
 * Split-It!
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { Bill } from '../models';
import { BillDto } from '../models';
import { BillFilter } from '../models';
import { User } from '../models';
/**
 * BillApi - axios parameter creator
 * @export
 */
export const BillApiAxiosParamCreator = function(configuration?: Configuration) {
  return {
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillAcceptBillIdPost: async (
      billId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'billId' is not null or undefined
      if (billId === null || billId === undefined) {
        throw new RequiredError(
          'billId',
          'Required parameter billId was null or undefined when calling apiBillAcceptBillIdPost.'
        );
      }
      const localVarPath = `/api/Bill/accept/{bill_id}`.replace(
        `{${'bill_id'}}`,
        encodeURIComponent(String(billId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'POST',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillBillIdDelete: async (
      billId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'billId' is not null or undefined
      if (billId === null || billId === undefined) {
        throw new RequiredError(
          'billId',
          'Required parameter billId was null or undefined when calling apiBillBillIdDelete.'
        );
      }
      const localVarPath = `/api/Bill/{bill_id}`.replace(
        `{${'bill_id'}}`,
        encodeURIComponent(String(billId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'DELETE',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillBillIdGet: async (
      billId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'billId' is not null or undefined
      if (billId === null || billId === undefined) {
        throw new RequiredError(
          'billId',
          'Required parameter billId was null or undefined when calling apiBillBillIdGet.'
        );
      }
      const localVarPath = `/api/Bill/{bill_id}`.replace(
        `{${'bill_id'}}`,
        encodeURIComponent(String(billId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {string} billId
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillBillIdPut: async (
      billId: string,
      body?: BillDto,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'billId' is not null or undefined
      if (billId === null || billId === undefined) {
        throw new RequiredError(
          'billId',
          'Required parameter billId was null or undefined when calling apiBillBillIdPut.'
        );
      }
      const localVarPath = `/api/Bill/{bill_id}`.replace(
        `{${'bill_id'}}`,
        encodeURIComponent(String(billId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'PUT',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      const needsSerialization =
        typeof body !== 'string' ||
        localVarRequestOptions.headers?.['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || '';

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {BillFilter} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillGetmanyGet: async (
      body?: BillFilter,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Bill/getmany`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      const needsSerialization =
        typeof body !== 'string' ||
        localVarRequestOptions.headers?.['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || '';

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillPost: async (body?: BillDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/Bill`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'POST',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      const needsSerialization =
        typeof body !== 'string' ||
        localVarRequestOptions.headers?.['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || '';

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiBillRejectBillIdPost: async (
      billId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'billId' is not null or undefined
      if (billId === null || billId === undefined) {
        throw new RequiredError(
          'billId',
          'Required parameter billId was null or undefined when calling apiBillRejectBillIdPost.'
        );
      }
      const localVarPath = `/api/Bill/reject/{bill_id}`.replace(
        `{${'bill_id'}}`,
        encodeURIComponent(String(billId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'POST',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billsGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/bills`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/create`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usersGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/users`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? await configuration.apiKey('Token')
            : await configuration.apiKey;
        localVarHeaderParameter['Token'] = localVarApiKeyValue;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions
      };
    }
  };
};

/**
 * BillApi - functional programming interface
 * @export
 */
export const BillApiFp = function(configuration?: Configuration) {
  return {
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillAcceptBillIdPost(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(
        configuration
      ).apiBillAcceptBillIdPost(billId, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdDelete(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).apiBillBillIdDelete(
        billId,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdGet(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BillDto>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).apiBillBillIdGet(
        billId,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {string} billId
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdPut(
      billId: string,
      body?: BillDto,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BillDto>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).apiBillBillIdPut(
        billId,
        body,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {BillFilter} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillGetmanyGet(
      body?: BillFilter,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Bill>>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).apiBillGetmanyGet(
        body,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillPost(
      body?: BillDto,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BillDto>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).apiBillPost(
        body,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillRejectBillIdPost(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(
        configuration
      ).apiBillRejectBillIdPost(billId, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async billsGet(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Bill>>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).billsGet(options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createGet(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Bill>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).createGet(options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersGet(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<User>>>> {
      const localVarAxiosArgs = await BillApiAxiosParamCreator(configuration).usersGet(options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    }
  };
};

/**
 * BillApi - factory interface
 * @export
 */
export const BillApiFactory = function(
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillAcceptBillIdPost(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<string>> {
      return BillApiFp(configuration)
        .apiBillAcceptBillIdPost(billId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdDelete(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<string>> {
      return BillApiFp(configuration)
        .apiBillBillIdDelete(billId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdGet(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<BillDto>> {
      return BillApiFp(configuration)
        .apiBillBillIdGet(billId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} billId
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillBillIdPut(
      billId: string,
      body?: BillDto,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<BillDto>> {
      return BillApiFp(configuration)
        .apiBillBillIdPut(billId, body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {BillFilter} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillGetmanyGet(
      body?: BillFilter,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Bill>>> {
      return BillApiFp(configuration)
        .apiBillGetmanyGet(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {BillDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillPost(
      body?: BillDto,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<BillDto>> {
      return BillApiFp(configuration)
        .apiBillPost(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} billId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiBillRejectBillIdPost(
      billId: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<string>> {
      return BillApiFp(configuration)
        .apiBillRejectBillIdPost(billId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async billsGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Bill>>> {
      return BillApiFp(configuration)
        .billsGet(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Bill>> {
      return BillApiFp(configuration)
        .createGet(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<User>>> {
      return BillApiFp(configuration)
        .usersGet(options)
        .then((request) => request(axios, basePath));
    }
  };
};

/**
 * BillApi - object-oriented interface
 * @export
 * @class BillApi
 * @extends {BaseAPI}
 */
export class BillApi extends BaseAPI {
  /**
   *
   * @param {string} billId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillAcceptBillIdPost(
    billId: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<string>> {
    return BillApiFp(this.configuration)
      .apiBillAcceptBillIdPost(billId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {string} billId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillBillIdDelete(
    billId: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<string>> {
    return BillApiFp(this.configuration)
      .apiBillBillIdDelete(billId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {string} billId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillBillIdGet(
    billId: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<BillDto>> {
    return BillApiFp(this.configuration)
      .apiBillBillIdGet(billId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {string} billId
   * @param {BillDto} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillBillIdPut(
    billId: string,
    body?: BillDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<BillDto>> {
    return BillApiFp(this.configuration)
      .apiBillBillIdPut(billId, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {BillFilter} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillGetmanyGet(
    body?: BillFilter,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Bill>>> {
    return BillApiFp(this.configuration)
      .apiBillGetmanyGet(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {BillDto} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillPost(
    body?: BillDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<BillDto>> {
    return BillApiFp(this.configuration)
      .apiBillPost(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {string} billId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async apiBillRejectBillIdPost(
    billId: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<string>> {
    return BillApiFp(this.configuration)
      .apiBillRejectBillIdPost(billId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async billsGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Bill>>> {
    return BillApiFp(this.configuration)
      .billsGet(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async createGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Bill>> {
    return BillApiFp(this.configuration)
      .createGet(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillApi
   */
  public async usersGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<User>>> {
    return BillApiFp(this.configuration)
      .usersGet(options)
      .then((request) => request(this.axios, this.basePath));
  }
}