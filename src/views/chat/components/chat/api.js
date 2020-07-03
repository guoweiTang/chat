import { EventTarget } from '../../../../assets/js/util';
import { getImageByString } from './emoji/emoji';
import sio from 'socket.io';

export default class Chat extends EventTarget {
    constructor(){
        super();
    }
    connect(...args) {
        let _this = this;
        let socket = sio.connect.apply(null, args);
        socket.on('connect', function () {
            _this.trigger('connect');
    
            socket.on('message', function (data) {
                let {type, content} = data;
                _this.trigger('message', data);
    
                //事件分类处理
                switch (type) {
                    //普通消息
                    case 'IM_SEND_MESSAGE':
                        _this.trigger('FE_DEFAULT_MESSAGE', content);
                        break;
                    //状态改变
                    case 'IM_SESSION_UPDATE':
                        _this.trigger('FE_SESSION_UPDATE', content);
                        break;
                    default:
                        _this.trigger(type);
                }
            });
    
            socket.on('disconnect', function () {
                _this.trigger('disconnect');
            });
    
            socket.on('reconnect', function () {
                _this.trigger('reconnect');
            });
        });
        return socket;
    }
    static parseMessage(msg) {
        let type = msg.msgType;
        if (type === 0) {
            msg.msgContent = getImageByString(msg.msgContent);
            // console.log('普通消息');
        } else if(type === 1) {
            msg.msgContent = '图文混合消息';
        } else if(type === 2) {
            msg.msgContent = '图片消息';
        } else if(type === 3) {
            msg.msgContent = '音频消息';
        } else {
            msg.msgContent = '未知消息类型';
        }
    }
}
