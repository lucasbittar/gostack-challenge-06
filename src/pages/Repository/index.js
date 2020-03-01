import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Browser} from './styles';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const {repository} = this.props.route.params;

    navigation.setOptions({
      title: repository.name,
    });
  }

  render() {
    const {repository} = this.props.route.params;

    return <Browser source={{uri: repository.html_url}} />;
  }
}
