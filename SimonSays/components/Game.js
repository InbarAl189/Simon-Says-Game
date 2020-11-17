import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import Sound from 'react-native-sound';

export default class Game extends Component{ 
  constructor (props){
    super(props);
    this.blink = 0
    this.totalSequenceCounter = 0
    this.numOfSequences = 10
    this.currSequence = [] 
    this.totalSequence=[]
    this.top10HighScores=[]
      
    this.state = {
      clickDisable: true,
      greenBtn: {
        backgroundColor: 'darkgreen'
      },
      yellowBtn: {
        backgroundColor: 'yellow'
      },
      blueBtn: {
        backgroundColor: 'blue'
      },
      redBtn: {
        backgroundColor: 'red'
      }
    }


    this.playGame=this.playGame.bind(this)
    this.playerTurn=this.playerTurn.bind(this)
    this.blinkButtonAnimation = this.blinkButtonAnimation.bind(this)

  }

  playGame(){
    for (var i=0; i<this.numOfSequences; i++) {
      this.totalSequence.push(Math.floor(Math.random()*4)+1);
    }
    this.currSequence.push(this.totalSequence[this.totalSequenceCounter]) 
    this.ComputerTurn()
    this.setState({ clickDisable: false })
    this.numberOfClick=-1;
  }

  ComputerTurn = () => {
      var i=0;
      let intervalId = setInterval(()=> {
      if (this.currSequence.length == i) {
        clearInterval(intervalId);
      }
      else {
        if (this.currSequence[this.blink]==1){
          this.greenBlink();
      
        }
        if (this.currSequence[this.blink]==2){
          this.yellowBlink();
        
        }
        if (this.currSequence[this.blink]==3){
          this.blueBlink();
   
         
        }
        if (this.currSequence[this.blink]==4){
          this.redBlink();

        }
        this.blink++;
      }
      i++;
    }, 1500);   
    
    this.blink = 0;
}
   
  playerTurn(i){
    this.numberOfClick++
    if (this.currSequence[this.numberOfClick]==i){
      this.blinkButtonAnimation(i)
      if(this.currSequence.length == this.numberOfClick+1){
        if(this.currSequence.length == this.totalSequence.length){
          alert("You Won The Game!")
          this.totalSequenceCounter = 0
          this.currSequence=[]
          return
        }
        this.totalSequenceCounter++
        this.currSequence.push(this.totalSequence[this.totalSequenceCounter])
        this.ComputerTurn()
        this.numberOfClick=-1;
      }      
    }
    else{
      this.setState({ clickDisable: true })
      let ifScoreExists = this.top10HighScores.includes(this.totalSequenceCounter);
      console.log(ifScoreExists);
      if (!ifScoreExists) {
        if (this.top10HighScores.length < 10)
        {
          this.top10HighScores.push(this.totalSequenceCounter); // push to leaders board
          this.top10HighScores.sort();
          this.top10HighScores.reverse();
        }
        else {
          var minScore = Math.min(...this.top10HighScores);
          var index = this.top10HighScores.indexOf(minScore);
          if (this.totalSequenceCounter > minScore)
          {
            this.top10HighScores[index] = this.totalSequenceCounter;
          }
        }        
      }  
      this.totalSequenceCounter = 0
      this.currSequence = []
       Alert.alert('Game over', 'You lost the game. Press OK and then Start Game to play again.', [{ text: 'Ok' }]);
    }    
  }

  blinkButtonAnimation(i){ 
    if (i == 1){
        this.greenBlink();
      }
      if (i==2){
        this.yellowBlink();
      }
      if (i==3){
        this.blueBlink();
      }
      if (i==4){
        this.redBlink();
      }
  }
  
  greenBlink(){
    
    setTimeout(() => {
        this.setState( {
            greenBtn:{
              ...this.state.style1, backgroundColor: 'lightgreen'
            }
            })
        }, 200);
      setTimeout(() => {
        this.setState( {
            greenBtn:{
              ...this.state.style1, backgroundColor: 'darkgreen'
            }
            })
        }, 1000);
  } 

  yellowBlink(){
    setTimeout(() => {
      this.setState( {
          yellowBtn:{
            ...this.state.style1, backgroundColor: 'white'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          yellowBtn:{
            ...this.state.style1, backgroundColor: 'yellow'
          }
          })
        }, 1000);
  }

  blueBlink(){
    setTimeout(() => {
      this.setState( {
          blueBtn:{
            ...this.state.style1, backgroundColor: 'lightblue'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          blueBtn:{
            ...this.state.style1, backgroundColor: 'blue'
          }
          })
        }, 1000);
  }

  redBlink(){
    setTimeout(() => {
      this.setState( {
          redBtn:{
            ...this.state.style1, backgroundColor: 'pink'
          }
          })
      }, 200);
    setTimeout(() => {
      this.setState( {
          redBtn:{
            ...this.state.style1, backgroundColor: 'red'
          }
          })
        }, 1000);
  }

  render() {
    return (
      <View style={styles.backgroundScreen}>

        <TouchableOpacity style={styles.startBtn}
        onPress={this.playGame}> 
          <Text style={styles.startBtnText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.highScoreBtn}
          onPress={() => this.props.navigation.navigate('High Scores', this.top10HighScores)}> 
          <Text style={styles.highScoreBtnText}>High Scores</Text>
        </TouchableOpacity>

        <Text style={styles.scoreText}> Score: {this.totalSequenceCounter}</Text>

        <TouchableOpacity
          style={[styles.greenBtn, this.state.greenBtn]} 
          disabled={this.state.clickDisable}
          onPress={() => this.playerTurn(1)}>         
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.redBtn, this.state.redBtn]} 
          disabled={this.state.clickDisable}
          onPress={() => this.playerTurn(4)}>
        </TouchableOpacity> 
        
        <TouchableOpacity
          style={[styles.yellowBtn, this.state.yellowBtn]} 
          disabled={ this.state.clickDisable}
          onPress={() => this.playerTurn(2)}>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.blueBtn, this.state.blueBtn]} 
          disabled={this.state.clickDisable}
          onPress={() => this.playerTurn(3)}>      
        </TouchableOpacity>

      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  greenBtn:{
    height: 140,
    width: 140,  
    borderRadius:40,    
    position: 'absolute',
    top:350,
    left: 50
  },
   redBtn:{
    height: 140,
    width: 140,  
    borderRadius:40,   
    position: 'absolute',
    top: 350,
    left: 210
  },
  yellowBtn:{
    height: 140,
    width: 140,  
    borderRadius:40, 
    position: 'absolute',
    left: 210,
    top: 505,
  },
  blueBtn: {
    height: 140,
    width: 140,  
    borderRadius:40,   
    position: 'absolute',
    left: 50,
    top: 505,
  },
  startBtn:{   
    marginTop: 50,
    width: 230,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#6602A3',
  },
  highScoreBtn: {
    marginTop: 30,
    width: 160,
    backgroundColor: 'grey',
    height: 60,
    borderRadius: 20,
    alignSelf: 'center',
  },
  startBtnText: {
     color:'white',
      fontSize: 35,
      fontWeight:'bold',
      alignSelf: 'center',
      marginTop: 20,
  },
  highScoreBtnText: {
      color:'white',
      alignSelf: 'center',
      marginTop: 16, 
      fontSize: 20
  },
  scoreText: {
    color:'white',
    alignSelf: 'center',
    marginTop: 40, 
    fontSize: 25
  },
  backgroundScreen: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  },
});