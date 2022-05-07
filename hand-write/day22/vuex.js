let Vue;
// 声明Store类
class Store {
  constructor(options = {}) {
    const store = this;
    this._wrappedGetters = options.getters;

    // 定义computed 选项
    const computed = {};
    this.getters = {};
    Object.keys(this._wrappedGetters).forEach((key) => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key];
      // 转换为computed可以使用无参数形式
      computed[key] = function () {
        return fn(store.state);
      };
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      });
    });
    this._vm = new Vue({
      // data中的值都会做响应化处理
      data: {
        // 相当于总线
        $$state: options.state,
      },
      // 利用vue的computed计算属性
      computed,
    });

    this._actions = options.actions;

    // 保存用户配置的mutations选项
    this._mutations = options.mutations || {};

    // 锁死commit,dispatch函数this指向

    const { commit, dispatch } = store;
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload);
    };
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload);
    };
  }

  get state() {
    // 存取器使之成为只读
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  commit(type, payload) {
    // 获取type对应的mutation
    const entry = this._mutations[type];

    if (!entry) {
      console.error(`unknown mutation type: ${type}`);
      return;
    }
    // 指定上下文为Store实例
    // 传递state给mutation entry(this.state, payload);
    entry(this.state, payload);
  }
  // dispatch，执行异步任务或复杂逻辑
  dispatch(type, payload) {
    // 1.获取action
    const entry = this._actions[type];

    if (!entry) {
      console.error('哎呦，没有这个action');
      return;
    }

    // 异步结果处理常常需要返回Promise
    return entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // this.$options为Vue 实例的初始化选项
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default { Store, install };
