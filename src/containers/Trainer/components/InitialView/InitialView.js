import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";

export default class InitialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsCreated: false
    };
  }

  handleClick = () => {
    this.props.updateCards();
    return this.setState({
      cardsCreated: true
    });
  };

  render() {
    const { cardsCreated } = this.state;
    const { onStartPress } = this.props;
    return (
      <div>
        <h1 style={{ marginTop: 5 }}> Frame Data Trainer </h1>
        <h3 style={{ textAlign: "right" }}> Training Mode On The Go </h3>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginBottom: 10
          }}
        >
          <Button
            style={{ width: "40%" }}
            bsStyle={cardsCreated ? "success" : "primary"}
            bsSize="large"
            onClick={
              cardsCreated ? () => onStartPress() : () => this.handleClick()
            }
            block
          >
            {" "}
            {cardsCreated ? "Start Round" : "Setup Round"}
          </Button>
        </div>

        <p>
          In the trainer, you are shown a series of moves and are tested on how
          well you know the correct frame data. The trainer is completely
          customizable. Use the NavBar to choose the character, filter, and
          property based on your needs.
        </p>

        <p>
          After selecting the character, select a filter to narrow down their
          movelist. To learn a new character, the "Most Popular" filter is a
          good starting point. Finally, select which data you wish to learn.
          Looking to punish? Select the "on_block" property. Curious about
          startup? Select the "speed" property.
        </p>

        <p>
          After choosing character, filter, and property, click "Setup Round".
          When you're ready to start the round, click "Start Round".
        </p>

        <Alert bsStyle="info" style={{ marginTop: 20 }}>
          FDT is constantly being improved. At the moment, only Dragunov's Most
          Popular moves have working GIFs!
        </Alert>
      </div>
    );
  }
}
