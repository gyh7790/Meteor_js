import { Message, Notification } from 'element-ui'

export const msg = {
    success:function(msg) {
        Message.success(msg);
    },
    
    warning : function (msg) {
        Message.warning(msg);
    },
    
    error : function (msg) {
        Message.error(msg)
    },
      
    info : function (msg) {
        Message.info(msg);
    }
} 

export const notify = {
    success:function(msg,title) {
        Notification.success({
            title: title || '成功',
            message: msg
        });
    },
    
    warning : function (msg,title) {
        Message.warning({
            title: title || '警告',
            message: msg
        });
    },
    
    error : function(msg,title) {
        Message.error({
            title: title || '失败',
            message: msg
        });
    },
      
    info : function (msg,title) {
        Message.info({
            title: title || '消息',
            message: msg
        });
    }
} 
