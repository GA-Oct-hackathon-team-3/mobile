import React from "react";
import ConfettiCannon from "react-native-confetti-cannon";

class Confetti extends React.PureComponent {
  //   explosion;

  //   handleSomeKindOfEvent = () => {
  //     this.explosion && this.explosion.start();
  //   };

  render() {
    return (
      <ConfettiCannon
        count={250}
        origin={{ x: -20, y: 0 }}
        autoStart={true}
        fadeOut={true}
        ref={(ref) => (this.explosion = ref)}
        fallSpeed={4000}
      />
    );
  }
}

export default Confetti;
