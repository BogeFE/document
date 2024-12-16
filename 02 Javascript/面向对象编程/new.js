function myNew(){
    const object = new Object();
    const constructor = Array.prototype.shift.call(arguments);
    object.__proto__ = constructor.prototype;

    let result = constructor.apply(object,arguments);
    return typeof result === "object" ? result : object;
}