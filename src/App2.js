import React, { Component } from 'react';
import './App.css';

class Radio extends Component {
  constructor() {
    super()

    this.state = {
      volume: 0
    }

    console.log('constructor')
  }

  onIncrease = () => {
    this.setState({ volume: this.state.volume + 1 })
  }

  onDecrease = () => {
    this.setState({ volume: this.state.volume - 1 })
  }

  componentDidMount() {
    console.log('component did mount')
    console.log('-------------------')
  }

  componentDidUpdate(prevProps) {
    console.log('component did update', prevProps)
    console.log('-------------------')
  }

  getSnapshotBeforeUpdate() {
    return 100
  }

  render () {
    console.log('render')
    return (
      <div>
        <button onClick={this.onIncrease}>Increase</button>
        <button onClick={this.onDecrease}>Decreease</button>
        <div>Volume: {this.state.volume}</div>
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.volume >= 300) {
      console.log('shouldComponentUpdate', nextState.volume)
      return false
    }
    return true
  }

  // allows to copy props into state
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state)
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        volume: props.seed
      }
    }
    return null
  }
}

class App extends Component {
  constructor () {
    super()

    this.state = {
      seed: 200
    }
  }

  seedGenerator = () => {
    this.setState({ seed: Math.parseInt(Math.random() * 100) })
  }

  render () {
    return (
      <div className='App'>
        <div>
          <button onClick={this.seedGenerator}>Generate seed</button>
        </div>
        <Radio seed={this.state.seed} />
      </div>
    )
  }
}

export default App