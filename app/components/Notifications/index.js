import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import { NotificationList, NotificationHeader, NotificationItem } from './styles';

export default class Notifiations extends React.Component {
  static propTypes = {
    type: T.string.isRequired,
    visible: T.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
  }

  renderMessages() {
    const { messages } = this.props;

    if (!messages) return null;

    return messages.map((message) => {
      return (
        <NotificationItem key={messages.indexOf(message)}>{message}</NotificationItem>
      );
    });
  }

  render() {
    const { messages, type, visible } = this.props;

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