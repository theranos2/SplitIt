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
/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    lastName?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    mfaEnabled?: boolean;
}
