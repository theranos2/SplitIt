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
import { Item } from './item';
import { User } from './user';
/**
 * 
 * @export
 * @interface Share
 */
export interface Share {
    /**
     * 
     * @type {string}
     * @memberof Share
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Share
     */
    hasPaid?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Share
     */
    hasAccepted?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Share
     */
    total?: number;
    /**
     * 
     * @type {User}
     * @memberof Share
     */
    payer?: User;
    /**
     * 
     * @type {Array<Item>}
     * @memberof Share
     */
    items?: Array<Item> | null;
}
