const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function LazyMan(name) {
  const cmds = [['greet', name]];

  const actions = {
    greet: (name) => console.log(`Hi, I'm ${name}.`),
    eat: (food) => console.log(`Eat ${food}.`),
    sleep: (ms) =>
      sleep(ms * 1000).then(() =>
        console.log(`Wake up after ${ms} seconds`)
      )
  };

  Promise.resolve().then(exec);

  async function exec() {
    for (const [cmd, val] of cmds) {
      await actions[cmd](val);
    }
  }

  return {
    sleep(ms) {
      cmds.push(['sleep', ms]);
      return this;
    },
    sleepFirst(ms) {
      cmds.unshift(['sleep', ms]);
      return this;
    },
    eat(food) {
      cmds.push(['eat', food]);
      return this;
    },
  };
}
