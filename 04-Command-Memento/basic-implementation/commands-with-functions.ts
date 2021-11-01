type UndoFunction<State> = (state: State) => State;
type CommandFunction<State> = (state: State) => [State, UndoFunction<State>];

function createCommandStack<State>(state: State) {
  const stack: UndoFunction<State>[] = [];
  let _state = state;

  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },
    undo() {
      const undoFunction = stack.pop();
      if (undoFunction) {
        _state = undoFunction(_state);
      }
      return _state;
    },
  };
}

const addOne: CommandFunction<number> = (state) => [state + 1, (state) => state - 1];
const subOne: CommandFunction<number> = (state) => [state - 1, (state) => state + 1];

const createSetValue = (value: number): CommandFunction<number> => {
  return (state) => {
    const _originalState = state;
    return [value, () => _originalState];
  };
};

const cStack = createCommandStack(0);

console.log(cStack.execute(addOne)); //1
console.log(cStack.undo()); // 0
console.log(cStack.execute(subOne)); //-1
console.log(cStack.undo()); // 0

const setTo36 = createSetValue(36);
console.log(cStack.execute(setTo36)); //36
console.log(cStack.undo()); // 0

export {};
