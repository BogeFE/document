interface IOptions {
    url: string;
    type?: string;
    data: any;
    timeout?: number;
}

function dataToURLParam(data){
    const arr = [];
    for(let key in data){
        arr.push(`${key}=${encodeURIComponent(data[key])}`);
    }
    return arr.join('&');
}

export function myAjax(options: IOptions){
    return new Promise((resolve,reject) => {
        if(!options.url){
            return;
        }
        options.type = options.type || "GET";
        options.data = options.data || {};
        options.timeout = options.timeout || 3000

        let param = dataToURLParam(options.data);
        let xhr;
        let timer;

        if((window as any).XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject('MircosoftXML');
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    resolve(xhr.responseText);
                }else{
                    reject(xhr.status);
                }
            }
        }
        if(options.type.toUpperCase() === "GET"){
            xhr.open('get',`${options.url}?${param}`,true);
            xhr.send();
        }else if(options.type.toUpperCase() === "POST"){
            xhr.open('get',`${options.url}?${param}`,true);
            xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
            xhr.send(options.data);
        }

        if(options.timeout){
            timer = setTimeout(() => {
                xhr.abort();
                alert('请求已超时！');
            },options.timeout);
        }
    })
}