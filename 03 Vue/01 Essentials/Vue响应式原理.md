# Vue 响应式原理

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b52c07de7ac54f52abbc3d2f000f808b~tplv-k3u1fbpfcp-watermark.awebp)




#### 核心API —— Object.defineProperty()

```js
Object.defineProperty(this.$data,'a',{
    get(){
        return value
    },
    set(newValue){
        value = newValue;
    }
})
```



#### 响应式 —— *Observer*

**作用**:：给对象的属性添加`getter`和`setter`，用于依赖收集和派发更新

```js
class Observer{
    constructor(){
        observer(this.data);
    }
    
    observer(data){
        const keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            Object.defineProperty(this.$data,keys[i],{
                get(){
                    return value;
                },
                set(newValue){
                    value = newValue;
                }
            });
        }
    }
}
```



#### 收集依赖 —— Dep

一个属性可能有多个依赖，每个响应式数据都有一个`Dep`来管理它的依赖

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6097bb7630dc44a68cb6b4c4dbef62f1~tplv-k3u1fbpfcp-watermark.awebp)

#### 观察者对象 —— Watcer

