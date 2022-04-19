// please complete the implementation
class EventEmitter {
  constructor() {
    //维护一个订阅该对象的map
    //map:  (eventName,[callback...]),key为eventName，value是由相同eventName的回调函数组成的数组
    this.watcher = new Map();
  }
  subscribe(eventName, callback) {
    var watcher = this.watcher;
    if (!watcher.has(eventName)) {
      //eventName不存在，则添加
      watcher.set(eventName, [callback]);
    } else {
      //存在则向对应value里增加callback
      watcher.set(eventName, [...watcher.get(eventName), callback]);
    }
    return {
      //返回一个包含release方法的对象
      release: function () {
        //找到对应的callback，删除
        //此时利用闭包，使用的是第10行的watcher
        watcher.get(eventName).map((item, index) => {
          if (item == callback) {
            watcher.get(eventName).splice(index, 1);
          } else {
            return item;
          }
        });
      },
    };
  }

  emit(eventName, ...args) {
    if (this.watcher.has(eventName)) {
      //eventName存在则依此调用watcher里的callback
      this.watcher.get(eventName).forEach((call) => {
        call.apply(this, args);
      });
    }
  }
  // subscriptions = new Map();

  // subscribe(eventName, callback) {
  //   if (!this.subscriptions.has(eventName)) {
  //     this.subscriptions.set(eventName, new Set())
  //   }

  //   const curSubscriptions = this.subscriptions.get(eventName);
  //   callbackObj = { callback };

  //   curSubscriptions.add(callbackObj);

  //   return {
  //     release() {
  //       curSubscriptions.delete(callbackObj);
  //       if (curSubscriptions.size === 0) {
  //         this.subscriptions.delete(eventName);
  //       }
  //     }
  //   }

  // }

  // emit(eventName, ...args) {
  //   const curSubscriptions = this.subscriptions.get(eventName);
  //   if (curSubscriptions) {
  //     curSubscriptions.forEach((callbackObj) => {
  //       callbackObj.callback.apply(this, args)
  //     })
  //   }
  // }
}
