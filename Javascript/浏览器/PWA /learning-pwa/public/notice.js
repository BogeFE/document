// 获取权限
function getPermission() {
    console.log('当前用户的消息提示权限是----', Notification.permission);
    if (Notification.permission === 'granted') {
        // 用户已授权，可展示通知
        setTimeout(() => {
            const title = 'PWA';
            const options = {
                body: '爪哇教育——大巫老师',
                icon: './img/icons/zhuawa-32.png',
                tag: 'user',
                renotify: true,
                data: {
                    msg: '这是权限通知中的data',
                },
            };
            showPush(title, options);
        }, 2000);
      } else if (Notification.permission === 'denied') {
        // 用户已禁止
      } else {
        // 用户尚未授权，需首先向用户申请通知权限
        toRequestPermission();
      }
};
// 向用户申请权限
function toRequestPermission() {
    Notification.requestPermission().then(permission => {
        // 通过 permission 判断用户的选择结果
        console.log(permission);
      })
};
/*
    onclick：通知点击事件
    onclose：通知关闭事件，无论是用户手动关闭，还是调用 Notification.close() 均会触发
    onshow：通知显示
    onerror：通知显示异常事件
*/
function showPush( title, options) {
    const notification = new Notification(title, options);
    notification.onclick = (e) => {
        notification.close();
        console.log(notification.data);
    };
};
getPermission();
