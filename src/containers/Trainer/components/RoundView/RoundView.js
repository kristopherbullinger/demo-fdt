// Too much going on
import React, { Component } from "react";

import RoundTypeBar from "./RoundTypeBar";
import RoundProgressBar from "./RoundProgressBar";
import RenderCard from "./RenderCard";

import createPostRoundData from "./createPostRoundData";

/**
 * Component to control the active Round Logic
 */
class RoundView extends Component {
  constructor(props) {
    super(props);
    const { cards } = this.props.round;
    this.state = {
      currentCardIndex: 0,
      userChoices: [],
      userCorrect: [],
      userScore: 0,
      total: cards.length,
      remaining: cards.length,
      afterChoice: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  setupPostRoundData = () => {
    const { round } = this.props;
    const { userChoices, userCorrect, userScore } = this.state;

    return createPostRoundData(
      round,
      userChoices,
      userCorrect,
      round.cards,
      userScore
    );
  };

  nextCard() {
    const { currentCardIndex, remaining } = this.state;
    // Now we need to call a function that will update the currentCardIndex
    this.setState({
      currentCardIndex: currentCardIndex + 1,
      remaining: remaining - 1,
      afterChoice: false
    });
  }

  handleClick = userChoice => {
    const {
      currentCardIndex,
      userChoices,
      userCorrect,
      userScore,
      remaining
    } = this.state;
    const { round, updatePostRoundData } = this.props;

    // First, push userChoice to userChocies
    this.setState({
      userChoices: [...userChoices, userChoice],
      afterChoice: true
    });

    // Compare the users choice to the answer of the current card
    // If it is correct, XXX
    // If it isn't, YYY
    if (userChoice === round.cards[currentCardIndex]["answer"]) {
      this.setState({
        userCorrect: [...userCorrect, true],
        userScore: userScore + 1
      });
    } else {
      this.setState({
        userCorrect: [...userCorrect, false]
      });
    }

    // If there are no remaining cards left when users makes a choice, switch to Score Screen
    if (remaining < 1) {
      return updatePostRoundData(this.setupPostRoundData());
    }

    setTimeout(() => this.nextCard(), 300);
  };

  render() {
    const { round, updatePostRoundData, endRound } = this.props;
    const {
      currentCardIndex,
      userScore,
      total,
      remaining,
      afterChoice
    } = this.state;
    const currentCard = round.cards[currentCardIndex];

    if (remaining < 1) {
      updatePostRoundData(this.setupPostRoundData());
      endRound();
      return <div />;
    } else {
      return (
        <div>
          <RoundTypeBar round={round} />
          <RoundProgressBar
            total={total}
            score={userScore}
            remaining={remaining}
          />
          <RenderCard
            afterChoice={afterChoice ? "clicked" : null}
            card={currentCard}
            buttonFunction={this.handleClick}
            character={round.character}
          />
        </div>
      );
    }
  }
}

export default RoundView;
