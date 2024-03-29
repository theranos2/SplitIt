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
import { UserInfoDto } from '../models';
import { UserSort } from '../models';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Show all users
         * @param {UserSort} [sortBy] Sort results
         * @param {string} [email] 
         * @param {string} [firstname] 
         * @param {string} [lastname] 
         * @param {number} [take] Maximum users to return
         * @param {number} [skip] Skip number of users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserGet: async (sortBy?: UserSort, email?: string, firstname?: string, lastname?: string, take?: number, skip?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/User`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Token required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Token")
                    : await configuration.apiKey;
                localVarHeaderParameter["Token"] = localVarApiKeyValue;
            }

            if (sortBy !== undefined) {
                localVarQueryParameter['sortBy'] = sortBy;
            }

            if (email !== undefined) {
                localVarQueryParameter['email'] = email;
            }

            if (firstname !== undefined) {
                localVarQueryParameter['firstname'] = firstname;
            }

            if (lastname !== undefined) {
                localVarQueryParameter['lastname'] = lastname;
            }

            if (take !== undefined) {
                localVarQueryParameter['take'] = take;
            }

            if (skip !== undefined) {
                localVarQueryParameter['skip'] = skip;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Show user given the ID
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserUserIdGet: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling apiUserUserIdGet.');
            }
            const localVarPath = `/api/User/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Token required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Token")
                    : await configuration.apiKey;
                localVarHeaderParameter["Token"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Show all users
         * @param {UserSort} [sortBy] Sort results
         * @param {string} [email] 
         * @param {string} [firstname] 
         * @param {string} [lastname] 
         * @param {number} [take] Maximum users to return
         * @param {number} [skip] Skip number of users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserGet(sortBy?: UserSort, email?: string, firstname?: string, lastname?: string, take?: number, skip?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<UserInfoDto>>>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserGet(sortBy, email, firstname, lastname, take, skip, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Show user given the ID
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserUserIdGet(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserInfoDto>>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserUserIdGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Show all users
         * @param {UserSort} [sortBy] Sort results
         * @param {string} [email] 
         * @param {string} [firstname] 
         * @param {string} [lastname] 
         * @param {number} [take] Maximum users to return
         * @param {number} [skip] Skip number of users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserGet(sortBy?: UserSort, email?: string, firstname?: string, lastname?: string, take?: number, skip?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<UserInfoDto>>> {
            return UserApiFp(configuration).apiUserGet(sortBy, email, firstname, lastname, take, skip, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Show user given the ID
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserUserIdGet(userId: string, options?: AxiosRequestConfig): Promise<AxiosResponse<UserInfoDto>> {
            return UserApiFp(configuration).apiUserUserIdGet(userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @summary Show all users
     * @param {UserSort} [sortBy] Sort results
     * @param {string} [email] 
     * @param {string} [firstname] 
     * @param {string} [lastname] 
     * @param {number} [take] Maximum users to return
     * @param {number} [skip] Skip number of users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public async apiUserGet(sortBy?: UserSort, email?: string, firstname?: string, lastname?: string, take?: number, skip?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<UserInfoDto>>> {
        return UserApiFp(this.configuration).apiUserGet(sortBy, email, firstname, lastname, take, skip, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Show user given the ID
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public async apiUserUserIdGet(userId: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<UserInfoDto>> {
        return UserApiFp(this.configuration).apiUserUserIdGet(userId, options).then((request) => request(this.axios, this.basePath));
    }
}
