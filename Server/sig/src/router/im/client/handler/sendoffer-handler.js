/*
* 发送SDP逻辑处理类
* Author: Max.Chiu
* */

// 项目公共库
const Common = require('../../../../lib/common');
const Http = require('http');
const QueryString = require('querystring');

// 在线用户
const OnlineUserManager = require('../../../../user/online-users').OnlineUserManager;
// 业务管理器
const BaseHandler = require('./base-handler');
// 推送消息
const NoticeSender = require('../notice-sender/notice-sender');
const SendOfferNotice = require('../notice/sendoffer-notice');

module.exports = class SendOfferHandler extends BaseHandler {
    constructor() {
        super();
    }

    static getRoute() {
        return 'imP2P/sendOffer';
    }

    async handle(ctx, reqData) {
        return await new Promise( async (resolve, reject) => {
            let bFlag = false;
            let user = this.getBaseRespond(ctx, reqData);

            if( !Common.isNull(user) ) {
                // 查找目标用户
                if( !Common.isNull(reqData.req_data.peerId) ) {
                    OnlineUserManager.getInstance().getUserWithId(reqData.req_data.peerId).then( async (userList) => {
                        for (let i = 0; i < userList.length; i++) {
                            let desUser = userList[i];

                            // 发送消息到用户
                            let sender = new NoticeSender();
                            let notice = new SendOfferNotice(user.userId, desUser.userId, reqData.req_data.sdp);
                            sender.send(desUser.userId, notice);
                        }
                    }).catch( () => {
                        this.respond.resData.errno = 10003;
                        this.respond.resData.errmsg = 'User ' + reqData.req_data.peerId + ' is not online.';
                    });
                } else {
                    this.respond.resData.errno = 10003;
                    this.respond.resData.errmsg = 'Parameter "peerId" Is Missing.';
                }
            }

            resolve(this.respond);
        });
    }
}

