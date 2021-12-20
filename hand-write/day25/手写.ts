function model(state: { value: string }, element: HTMLInputElement) {
  // your code here
  element.value = state.value;
  Object.defineProperty(state, "value", {
    get: () => element.value,
    set: (value) => (element.value = value),
  });
}
