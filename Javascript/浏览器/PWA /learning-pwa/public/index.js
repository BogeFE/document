

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw1.js').then(function (reg) {
        console.log('Service Worker 注册成功 index.html');
        console.log(reg);
        // setInterval(() => {
        //     reg.update()
        //   }, 60 * 60 * 1000);
    });
};