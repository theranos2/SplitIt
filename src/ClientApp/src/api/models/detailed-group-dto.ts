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
import { UserInfoDto } from './user-info-dto';
/**
 * 
 * @export
 * @interface DetailedGroupDto
 */
export interface DetailedGroupDto {
    /**
     * 
     * @type {string}
     * @memberof DetailedGroupDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof DetailedGroupDto
     */
    name?: string | null;
    /**
     * 
     * @type {UserInfoDto}
     * @memberof DetailedGroupDto
     */
    owner?: UserInfoDto;
    /**
     * 
     * @type {number}
     * @memberof DetailedGroupDto
     */
    memberCount?: number;
    /**
     * 
     * @type {Array<UserInfoDto>}
     * @memberof DetailedGroupDto
     */
    members?: Array<UserInfoDto> | null;
}
