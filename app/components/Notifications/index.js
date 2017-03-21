import React, { PropTypes as T } from 'react';

import { NotificationList, NotificationHeader, NotificationItem } from './styles';

export default class Notifiations extends React.Component {
  static propTypes = {
    type: T.string.isRequired,
    messages: T.array,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.target.parentNode.classList.remove('visible');
  }

  renderMessages() {
    const { messages } = this.props;

    if (!messages) return null;

    return messages.map((message) => { // eslint-disable-line
      return (
        <NotificationItem key={messages.indexOf(message)}>{message}</NotificationItem>
      );
    });
  }

  render() {
    const { messages, type } = this.props;

    const notificationClass = (messages && messages.length > 0) ? `${type} visible` : type;

    return (
      <NotificationList className={notificationClass}>
        <NotificationHeader onClick={this.handleClick}>
          Dismiss
        </NotificationHeader>
        {this.renderMessages()}
      </NotificationList>
    );
  }
}
