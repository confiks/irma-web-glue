import transitions from './state-transitions';

// Show state transitions on the console
const enableDebugging = true;

export default class StateMachine {

  constructor(callback) {
    this._callback = callback;
    this._setState('Uninitialized');
  }

  transition(t) {
    let newState = this._getNewState(t);
    this._log(newState, t);
    this._setState(newState);
  }

  _getNewState(t) {
    let newState = transitions[this._state][t];
    if (!newState) newState = transitions[this._state]['fail'];
    if (!newState) throw new Error(`Invalid transition '${t}' from state '${this._state}' and could not find a "fail" transition to fall back on.`);
    return newState;
  }

  _log(state, transition) {
    if (!enableDebugging) return;
    console.info(`🎰 State change: '${this._state}' → '${state}' (because of '${transition}')`);
  }

  _setState(state) {
    this._state = state;
    this._callback(this._state);
  }

}
