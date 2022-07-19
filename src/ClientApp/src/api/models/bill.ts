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
import { FileAttachment } from './file-attachment';
import { Item } from './item';
import { Share } from './share';
import { User } from './user';
/**
 * 
 * @export
 * @interface Bill
 */
export interface Bill {
    /**
     * 
     * @type {string}
     * @memberof Bill
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Bill
     */
    created?: Date;
    /**
     * 
     * @type {User}
     * @memberof Bill
     */
    owner?: User;
    /**
     * 
     * @type {number}
     * @memberof Bill
     */
    total?: number;
    /**
     * 
     * @type {string}
     * @memberof Bill
     */
    title?: string | null;
    /**
     * 
     * @type {Array<FileAttachment>}
     * @memberof Bill
     */
    attachments?: Array<FileAttachment> | null;
    /**
     * 
     * @type {Array<Share>}
     * @memberof Bill
     */
    shares?: Array<Share> | null;
    /**
     * 
     * @type {Array<Item>}
     * @memberof Bill
     */
    overallItems?: Array<Item> | null;
    /**
     * 
     * @type {boolean}
     * @memberof Bill
     */
    isSettled?: boolean;
}
