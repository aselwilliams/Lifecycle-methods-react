import React, { Component } from "react"
import "./styles.css"

class User extends Component {
  componentWillUnmount() {
  }

  render () {
    return (
      <li className="user">{this.props.user.name}</li>
    )
  }
}

class Users extends Component {
  constructor() {
    super()
    this.state = {
      showUsers: true
    }
  }

  toggleUsersHandler = () => {
    this.setState(currState => {
      return { showUsers: !currState.showUsers }
    })
  }

  render() {
    return (
      <div className="users">
        {this.props.loaded && <h3>Loading ...</h3>}

        <button onClick={this.toggleUsersHandler}>
          {this.state.showUsers ? "Hide" : "Show"}
        </button>

        {this.state.showUsers &&
          <ul>
            {this.props.users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </ul>
        }
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      filteredUsers: [],
      searchTerm: "",
      loaded: true
    }
  }

  componentDidMount() {
    // send http request
    setTimeout(() => {
      this.fetchAPI()
      this.setState({ loaded: !this.state.loaded })
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevState.searchTerm, this.state.searchTerm)
    if (prevState.searchTerm !== this.state.searchTerm) {
      // update filtered users
      this.setState({
        filteredUsers: this.state.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        )
      })
    }
  }

  fetchAPI = () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((data) => data.json())
      .then((res) => {
        this.setState({
          users: res,
          filteredUsers: res
        })
      })
  }

  searchChangeHandler = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  render () {
    // console.log('Render')
    return (
      <div>
        <div className="finder">
          <input type="search" onChange={this.searchChangeHandler} />
        </div>
        <Users
          users={this.state.filteredUsers}
          loaded={this.state.loaded}
          searchTerm={this.state.searchTerm}
        />
      </div>
    )
  }
}

export default App