import React, {Component} from 'react';
import './App.css';
import HighScoreModal from './HighScoreModal.js'
import Store from './Store.js'

// Easy difficulty could be done in 4 or less steps
// Hard difficulty could be done in 7 or less steps
// Insane difficulty could be done in 20 or less steps

const randomNumFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)+"";
 }

function formatTime(ms) {
  return Math.round(ms/1000)
}

const upgradeCosts = [100, 200]

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {value: '',
                  secretNum: randomNumFromRange(1, 10),
                  guessHistory: [],
                  difficulty: 10,
                  numberOfGuesses: 0,
                  time: 0,
                  isOn: false,
                  start: 0,
                  highscores: {
                    easy: Array(5).fill(),
                    hard: Array(5).fill(),
                    insane: Array(5).fill(),
                   },
                  storePoints: 0,
                  upgrades: {
                    helperBar: false,
                    surprise: false,
                    evenOdd: false,
                  }
                };
                  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.buyHelperBar = this.buyHelperBar.bind(this);
    this.buyEvenOdd = this.buyEvenOdd.bind(this);
  }

  buyHelperBar() {
    let points = this.state.storePoints;
      if (points < upgradeCosts[0]){
        alert("Not enough gems!")
    }
      else if (!this.state.upgrades.helperBar && points >= upgradeCosts[0]){
        let upgrades = this.state.upgrades
        upgrades.helperBar = true
        this.setState({upgrades: upgrades, storePoints: points-upgradeCosts[0]})
    }
  }

  buyEvenOdd() {
    let points = this.state.storePoints;
      if (points < upgradeCosts[1]){
        alert("Not enough gems!")
    }
      else if (!this.state.upgrades.evenOdd && points >= upgradeCosts[1]){
        let upgrades = this.state.upgrades
        upgrades.evenOdd = true
        this.setState({upgrades: upgrades, storePoints: points-upgradeCosts[1]})
    }
  }

  getHelperImage () {
    let secretNum = this.state.secretNum
    if (this.state.difficulty === 10) {
      secretNum = Math.round(10*secretNum)
    } else if (this.state.difficulty === 1000000) {
      secretNum = Math.round(secretNum/10000)
    }
    if (this.state.upgrades.helperBar[1]){
      return `${secretNum}(upgraded).png`
    } else {
      return `${secretNum}.png`
    }
  }

  getEvenOdd() {
    if (this.state.secretNum % 2 === 0){
      return "The number is even"
    } else {
      return "The number is odd"
    }
  }

  startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time}
        )
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);

    }


  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  };

  resetTimer() {
    this.setState({time: 0, isOn: false})
  };

  newGame() {
    let randNum = randomNumFromRange(1, 10);
    this.stopTimer();
    this.resetTimer();
    this.setState({
      secretNum: randNum, difficulty: 10, isOn: false,
      guessesNum: 0, guessHistory: [], numberOfGuesses: 0,
      });
  }

  changeDifficulty(level) {
    let randNum = randomNumFromRange(1, level);
    this.setState({difficulty: level, secretNum: randNum, guessHistory:[]})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  makeGuess() {
    this.setState({guessedNum: this.state.value})
  }

  handleSubmit(event) {
    let numGuesses = this.state.numberOfGuesses;
    let guessNum = this.state.guessHistory.unshift([this.state.guessedNum, null]);
    this.setState({guessHistory: guessNum, numberOfGuesses: numGuesses + 1})
    if (!this.state.isOn){
      this.startTimer()
    }

    if (this.state.guessedNum === this.state.secretNum) {

      let timeToWin = this.state.time;
      let highscores = this.state.highscores
      let pointsAwarded = ((this.state.difficulty**0.5)*(1000/(this.state.time+1000)))
      let pointsSaved = this.state.storePoints
      if (this.state.difficulty === 10){
        this.setState({storePoints: pointsSaved+(10*Math.round(10*pointsAwarded))})
        highscores.easy.push(timeToWin)
        highscores.easy.sort()  
        if (highscores.easy.length > 5){
          highscores.easy.pop()
        }
        this.setState({highscores: highscores})
      } else if (this.state.difficulty === 100){
        this.setState({storePoints: pointsSaved+(10*Math.round(20*pointsAwarded))})
        highscores.hard.push(timeToWin)
        highscores.hard.sort()
        if (highscores.hard.length > 5){
          highscores.hard.pop()
        }
        this.setState({highscores: highscores})
      } else {
        this.setState({storePoints: pointsSaved+(10*Math.round(pointsAwarded))})
        highscores.insane.push(timeToWin)
        highscores.insane.sort()
        if (highscores.insane.length > 5){
          highscores.insane.pop()
        }
        this.setState({highscores: highscores})
      }

      alert(`Number guessed correctly! You win!\nIt took you ${this.state.numberOfGuesses} tries.`);
      this.stopTimer();
      this.resetTimer();
      this.newGame();
    } else if (parseInt(this.state.guessedNum, 10) < parseInt(this.state.secretNum, 10)) {
      let temp = this.state.guessHistory;
      temp[0][1] = 0;
      this.setState({guessHistory: temp})
    } else if (parseInt(this.state.guessedNum, 10) > parseInt(this.state.secretNum, 10)){
      let temp = this.state.guessHistory;
      temp[0][1] = 1;
      this.setState({guessHistory: temp})
    }
    event.preventDefault();
  }

  
  render() {

    const historyList = this.state.guessHistory.map(num =>
      <tr className={num[1] == 1 ? "table-warning" : "table-primary"}>
        <td>{num[0]}{num[1] == 1 ? "   (Too High!)" : "   (Too Low!)"}</td>
      </tr>
      );

    let helperBar = <img src={"https://raw.githubusercontent.com/moe9195/guess-the-number/master/public/" + this.getHelperImage()} alt="helper" />
    let evenOdd = <h4 style={{color:'white'}} >{this.getEvenOdd()}</h4>

    return (
      <div className="App">

      <div className="fixed-top">
        <br/>
        <h3 style={{color:'white'}}> &nbsp; &nbsp; {(formatTime(this.state.time))}</h3>
      </div>

      <div className="fixed-top text-right">

      <br/>
      
      <HighScoreModal highscores={this.state.highscores}></HighScoreModal>
      <Store points={this.state.storePoints} upgrades={this.state.upgrades} buyHelperBar={this.buyHelperBar} buyEvenOdd={this.buyEvenOdd}></Store>

      </div>


        <div className="card-body" align="center">
        <br/>

          <h1 style={{color:'white'}}><br/>Guess The Number</h1> 
          <h6 style={{color:'white'}}>
            The computer selected a random number. <br/>
            Try to guess it. <br/><br/>
            Easy: the number is in the range 1-10<br/>
            Hard: the number is in the range 1-100<br/>
            Insane: the number is in the range 1-1000000<br/>
          </h6>
          <div>
          <br/>
          <button type="button" onClick={() => this.newGame()} className="btn btn-outline-light btn-lg">New Game</button> 
        </div>
        <br/>

        
    
        <br/>
          <h6 style={{color:'white'}}>Difficulty Level</h6>
          <div className="btn-group" role="group" aria-label="Difficulty Level">
            <button type="button" className={this.state.difficulty === 10 ? "btn btn-outline-light btn-lg active" : "btn btn-outline-light btn-lg"} onClick={() => this.changeDifficulty(10)}>Easy</button> 
            <button type="button" className={this.state.difficulty === 100 ? "btn btn-outline-light btn-lg active" : "btn btn-outline-light btn-lg"} onClick={() => this.changeDifficulty(100)}>Hard</button> 
            <button type="button" className={this.state.difficulty === 1000000 ? "btn btn-outline-light btn-lg active" : "btn btn-outline-light btn-lg"} onClick={() => this.changeDifficulty(1000000)}>Insane</button>
          </div>

          <br/>

        <div>
          <br/>
          <form onSubmit={this.handleSubmit}>
              <label>

              <input type="number" className = "form-control" min="1" max={this.state.difficulty} value={this.state.value}  onChange={this.handleChange}/>
              
        <br></br>
                <input type="submit" className = "btn btn-outline-light mb-1" value="Make a Guess" onClick={() => this.makeGuess()}/>
                </label>  
           
          </form>
        </div>

        {this.state.upgrades.helperBar == true ? helperBar : ""}
        {this.state.upgrades.evenOdd == true ? evenOdd : ""}
        
        <br/>
      
        <table className="table table-striped text-center">
          <thead>
            <tr style={{color:'white'}}>Previous Guesses</tr>
          </thead>
          <tbody>
          {historyList}
          </tbody>
        </table>
        

      </div>
    </div>

    )
  }
  
  
}

export default App;
