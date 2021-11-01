type CommandFunction<State> = (state: State) => State;

function createCommandStack<State>(state: State) {
  const stack: string[] = [JSON.stringify(state)];

  return {
    execute(command: CommandFunction<State>) {
      const currentState = JSON.parse(stack[stack.length - 1]);
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));
      return newState;
    },
    undo() {
      if (stack.length > 1) {
        stack.pop();
      }
      return JSON.parse(stack[stack.length - 1]);
    },
  };
}

const addOne: CommandFunction<number> = (state) => state + 1;
const subOne: CommandFunction<number> = (state) => state - 1;

const createSetValue =
  (value: number): CommandFunction<number> =>
  () =>
    value;

const cStack = createCommandStack(0);

console.log(cStack.execute(addOne)); //1
console.log(cStack.undo()); // 0
console.log(cStack.execute(subOne)); //-1
console.log(cStack.undo()); // 0

const setTo36 = createSetValue(36);
console.log(cStack.execute(setTo36)); //36
console.log(cStack.undo()); // 0

export {};
