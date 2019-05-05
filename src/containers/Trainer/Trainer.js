// This component is like a home for a ton of other stuff
// It's main job is to house the logic behind where the user is in a Round of the Trainer.
// Application State aka Redux is an obvious solution, but is it necessary?
// I think at the very least cleaning up this component is.
import React, { Component } from "react";

import InitialView from "./components/InitialView/InitialView";
import RoundView from "./components/RoundView/RoundView";
import ScoreView from "./components/ScoreView/ScoreView";

class Trainer extends Component {

  state = {
    roundStart: false,
    roundEnd: false
  };


  handleClick = () => {
    this.props.updateCards();
    this.setState({
      roundStart: true
    });
  };

  render() {
    const { roundStart, roundEnd, postRoundData } = this.state;
    const { round, updateCards } = this.props;

    if (roundEnd && postRoundData) {
      return (
        <ScoreView
          postRoundData={postRoundData}
          playAgain={() =>
            this.setState({
              roundStart: false,
              roundEnd: false
            })
          }
        />
      );
    }

    if (!roundStart)
      return (
        <InitialView
          round={round}
          onStartPress={() => this.handleClick()}
          updateCards={() => updateCards()}
        />
      );

    if (roundStart)
      return (
        <RoundView
          round={round}
          updatePostRoundData={data => {
            this.setState({
              postRoundData: data
            });
          }}
          endRound={() =>
            this.setState({
              roundEnd: true,
              roundStart: false
            })
          }
        />
      );
  }
}

export default Trainer;
