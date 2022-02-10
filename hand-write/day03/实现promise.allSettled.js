function allSettled(promises) {
  if (!promises) {
    return Promise.resolve('');
  }
  let answers = [],
    count = 0;

  return new Promise((resolve) => {
    promises.length
      ? promises.forEach((item, idx) => {
          currentItem = item instanceof Promise ? item : Promise.resolve(item);

          currentItem
            .then((res) => (answers[idx] = { status: 'fulfilled', value: res }))
            .catch(
              (err) => (answers[idx] = { status: 'rejected', reason: err })
            )
            .finally(() => {
              count++;
              count === promises.length && resolve(answers);
            });
        })
      : resolve([]);
  });
}
