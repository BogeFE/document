// 该文件用于测试代码

// 生成一个2s后resolve一个字符串的promise
const fn = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 2000)
})

