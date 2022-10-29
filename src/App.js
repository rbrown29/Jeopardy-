import React from 'react';

class App extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      items: [],
      isLoaded: false,
      isHidden: false,
      Score: 0

    }
  this.toggleQuestion = this.toggleQuestion.bind(this)
  this.increaseScore = this.increaseScore.bind(this)
  this.decreaseScore = this.decreaseScore.bind(this)
  this.resetScore = this.resetScore.bind(this)
  this.componentDidMount = this.componentDidMount.bind(this)
  this.newQuestion = this.newQuestion.bind(this)
  }

componentDidMount() {
  fetch('http://jservice.io/api/random')
  .then(responce => responce.json())
  .then(json => {
  this.setState({
      items: json,
      isLoaded: true, 
    })
  }).catch((error) => {
      console.log(error);
  });
} 
toggleQuestion () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
increaseScore () {
  this.setState({
    Score: this.state.Score += this.state.items[0].value
  })
}
decreaseScore () {
  this.setState({
    Score: this.state.Score -= this.state.items[0].value
  })
}
resetScore () {
  this.setState({
    Score: this.state.Score = 0
  })
}
newQuestion () {
  this.componentDidMount()
  this.toggleQuestion()
}

render () {
  const {isLoaded, items} = this.state;
  if(!isLoaded) {
    return <div>No Data!</div>
  } else {
  return (
    console.log(items),
    <div className="App">
       <h1>Welcome to Jeopardy</h1>
       <br />
       <h2>Score: {this.state.Score}</h2>
       <button onClick={this.decreaseScore}>Decrease</button>
       <button onClick={this.increaseScore}>Increase</button>
       <button onClick={this.resetScore}>Reset</button><br /><br />
       <h2>Lets Play!</h2><br />

       <button className="button" onClick={this.newQuestion}>New Question</button>
       <h2>Category: {items[0].category.title}</h2><br />
      <h2>Points: {items[0].value}</h2>

       {this.state.isHidden && (
        <div>
           <h3>Answer: {items[0].answer}</h3> <br /><br />
        </div>
        )}
       <h3>Question: {items[0].question}</h3><br /><br /> 
        <button className="button" onClick={this.toggleQuestion}>Reveal Answer</button> 
    </div>
  )
}
}
}


export default App;