import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Selector
import { makeSelectOnboardingStage } from 'containers/Onboarding/selectors';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    // Grab the onboarding stage
    const { onboardingStage } = this.props;

    // If no stage or it is less than 3
    if (!onboardingStage || onboardingStage < 3) {
      // Redirect to onboarding
      browserHistory.push({
        pathname: '/onboarding',
      });
    }
  }

  renderChildren() {
    const { children, onboardingStage } = this.props;

    // Don't show anything until we render the Onboarding
    if (!onboardingStage || onboardingStage < 3) return null;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, (c) => { // eslint-disable-line
        return React.cloneElement(c, this.props, {
        });
      });
    }
    return null;
  }

  render() {
    return (
      <section>
        {this.renderChildren()}
      </section>
    );
  }
}

Home.propTypes = {
  onboardingStage: T.any,
};

const mapStateToProps = createStructuredSelector({
  onboardingStage: makeSelectOnboardingStage(),
});

export default connect(mapStateToProps)(Home);
