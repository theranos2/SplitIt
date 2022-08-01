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
import { PaymentStatus } from './payment-status';
/**
 * 
 * @export
 * @interface PayDto
 */
export interface PayDto {
    /**
     * 
     * @type {PaymentStatus}
     * @memberof PayDto
     */
    paymentStatus?: PaymentStatus;
    /**
     * 
     * @type {number}
     * @memberof PayDto
     */
    grandTotal?: number;
    /**
     * 
     * @type {number}
     * @memberof PayDto
     */
    surchargeTotal?: number;
    /**
     * 
     * @type {number}
     * @memberof PayDto
     */
    splitItSurcharge?: number;
    /**
     * 
     * @type {number}
     * @memberof PayDto
     */
    stripeSurcharge?: number;
    /**
     * 
     * @type {number}
     * @memberof PayDto
     */
    billTotal?: number;
    /**
     * 
     * @type {string}
     * @memberof PayDto
     */
    sellerId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PayDto
     */
    clientSecret?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PayDto
     */
    transactionId?: string | null;
}
