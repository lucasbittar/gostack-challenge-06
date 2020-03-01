import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Author,
  Avatar,
  Bio,
  Container,
  Header,
  Info,
  Name,
  OwnerAvatar,
  Starred,
  Stars,
  Title,
} from './styles';

export default class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      setOptions: PropTypes.func,
    }).isRequired,
  };
  state = {
    stars: [],
    loading: true,
    refreshing: false,
    page: 1,
  };

  refreshList = () => {
    console.tron.log('REFRESHING...');
    this.setState({refreshing: true, stars: []}, this.loadRepositories);
  };

  loadMoreRepositories = () => {
    console.tron.log('LOADING MORE...');
    const {page} = this.state;

    const nextPage = page + 1;

    this.loadRepositories(nextPage);
  };

  loadRepositories = async (page = 1) => {
    const {user} = this.props.route.params;
    const {stars} = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {page},
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      refreshing: false,
    });
  };

  handleNavigate = repository => {
    console.tron.log('GO TO', repository.name);
    const {navigation} = this.props;

    navigation.navigate('Repository', {repository});
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const {user} = this.props.route.params;

    navigation.setOptions({
      title: user.name,
    });

    this.loadRepositories();
  }

  render() {
    const {stars, loading, refreshing} = this.state;
    const {user} = this.props.route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMoreRepositories}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
