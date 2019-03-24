import React from 'react';
import './App.css';

const buttons = [
  {
    "id":"divide",
    "display":"/",
    "type":"operator"
  },
  {
    "id":"nine",
    "display":"9",
    "type":"number"
  },
  {
    "id":"eight",
    "display":"8",
    "type":"number"
  },
  {
    "id":"seven",
    "display":"7",
    "type":"number"
  },
  {
    "id":"multiply",
    "display":"x",
    "type":"operator"
  },
  {
    "id":"six",
    "display":"6",
    "type":"number"
  },

  {
    "id":"five",
    "display":"5",
    "type":"number"
  },
  {
    "id":"four",
    "display":"4",
    "type":"number"
  },
  {
    "id":"subtract",
    "display":"-",
    "type":"operator"
  },
  {
    "id":"three",
    "display":"3",
    "type":"number"
  },
  {
    "id":"two",
    "display":"2",
    "type":"number"
  },
  {
    "id":"one",
    "display":"1",
    "type":"number"
  },

  {
    "id":"add",
    "display":"+",
    "type":"operator"
  },
  {
    "id":"decimal",
    "display":".",
    "type":"decimal"
  },
  {
    "id":"clear",
    "display":"AC",
    "type":"clear"
  },
  {
    "id":"zero",
    "display":"0",
    "type":"number"
  },

  {
    "id":"equals",
    "display":"=",
    "type":"equals"
  }
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormula: '',
      currentDisplay: '0',
      clearDisplayNext: true,
      decimalSelected: false
    }
    this.registerInput = this.registerInput.bind(this);
    this.evaluateFormula = this.evaluateFormula.bind(this);

  }
  componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
        script.async = true;
        script.type = 'text/javascript'
        document.body.appendChild(script);
        console.log(script);
  }
  componentDidUpdate(prevProps,prevState) {
    if (this.state !== prevState) {
      console.log(this.state);
    }
  }
  evaluateFormula(formula) {
    return Function('"use strict";return (' + formula + ')')();
  }
  registerInput(e) {
    switch(e.target.className) {
      case "number": {
        console.log("number pressed");
        if (this.state.clearDisplayNext) {
          this.setState({
            currentDisplay: `${e.target.innerHTML}`,
            currentFormula: `${e.target.innerHTML}`
          });
          if (e.target.innerHTML !== "0") {
            this.setState({
              clearDisplayNext: false
            });
          }
        }
        else {
          this.setState({
            currentDisplay: `${this.state.currentDisplay}${e.target.innerHTML}`,
            currentFormula: `${this.state.currentFormula}${e.target.innerHTML}`
          });
        }
        break;
      }
      case "operator": {
        console.log("operator pressed");
        var oldDisplay = this.state.currentDisplay;
        var oldFormula = this.state.currentFormula;

        if (this.state.currentFormula.toString().match(/[*/+-]$/)){
          console.log('operator already selected');
          var oldDisplay = oldDisplay.slice(0,-1);
          var oldFormula =  oldFormula.slice(0,-1);
        }
        if (e.target.innerHTML === "x") {
          this.setState({
            currentDisplay: `${oldDisplay}${e.target.innerHTML}`,
            currentFormula: `${oldFormula}*`,
            decimalSelected: false,
          });
        }
        else {
          this.setState({
            currentDisplay: `${oldDisplay}${e.target.innerHTML}`,
            currentFormula: `${oldFormula}${e.target.innerHTML}`,
            decimalSelected: false
          });
        }
        console.log(this.state)
        break;
      }
      case "decimal": {
        console.log("decimal button pressed");
        if (!this.state.decimalSelected) {
          console.log('decimal had not yet been pressed')
          this.setState({
            currentDisplay: `${this.state.currentDisplay}${e.target.innerHTML}`,
            currentFormula: `${this.state.currentFormula}${e.target.innerHTML}`,
            decimalSelected: true
          })
        }
        break;
      }
      case "clear": {
        console.log("AC button pressed");
        this.setState({
          currentDisplay: "0",
          currentFormula: "",
          clearDisplayNext: true,
          decimalSelected: false
        });
        break;
      }
      case "equals": {
        console.log("equals pressed");
        this.setState({
          currentDisplay: this.evaluateFormula(this.state.currentFormula),
          currentFormula: this.evaluateFormula(this.state.currentFormula),
          decimalSelected: false
        });
        break;
      }
      default: {
        console.log("something else pressed");
        this.setState({
          currentDisplay: `${this.state.currentDisplay}${e.target.innerHTML}`,
          currentFormula: `${this.state.currentFormula}${e.target.innerHTML}`
        });
      }
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Give your brain a break...
        </header>
        <Display message={this.state.currentDisplay}/>
        <div id="buttons">
        {buttons.map((button,index) => {
          return (
            <CalculatorButton register={this.registerInput} value={button.display} id={button.id} type={button.type}/>
          )
        })}
        </div>
      </div>
    );
  }
}

const CalculatorButton = (props) => {
  return (
    <button onClick={props.register} id={props.id} key={props.id} className={props.type}>{props.value}</button>
  )
}

const Display = (props) => {
  return (
    <div id="display">{props.message}</div>
  )
}

export default App;
