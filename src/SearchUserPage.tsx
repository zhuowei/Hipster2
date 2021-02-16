import {
  Container,
  IconButton,
  Box,
  Tab,
  Tabs,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import SearchHeader from './SearchHeader';
import React from 'react';
import {apiPost} from './common';

function UserListItem(props: any) {
  const u = props.user;
  const textStyle = {
    maxHeight: '48px',
    overflow: 'hidden',
  };
  const listItemClicked = () => {
    window.location.href = '/user.html?' + u.user_id;
  };
  return (
    <ListItem onClick={listItemClicked} button>
      <ListItemAvatar>
        <Avatar src={u.photo_url} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <b>{u.name}</b> @{u.username}
          </React.Fragment>
        }
        secondary={<Typography style={textStyle}>{u.bio}</Typography>}
      />
    </ListItem>
  );
}

class SearchUserPage extends React.Component {
  public state = {searchResult: [], searchText: ''};
  private searchDebounce = -1;
  private searchChanged = (newText: string) => {
    this.setState({searchText: newText});
    clearTimeout(this.searchDebounce);
    this.searchDebounce = window.setTimeout(() => {
      this.doTheSearch();
    }, 1000);
  };
  private async doTheSearch() {
    const originalText = this.state.searchText;
    if (originalText.length === 0) {
      this.setState({searchResult: []});
      return;
    }
    console.log('doing the search!', originalText);
    const response = await apiPost('search_users', {
      cofollows_only: false,
      following_only: false,
      followers_only: false,
      query: this.state.searchText,
    });
    if (originalText != this.state.searchText) {
      return;
    }
    if (response.success) {
      this.setState({searchResult: response.users});
    } else {
      this.setState({searchResult: []});
    }
  }
  render() {
    return (
      <React.Fragment>
        <SearchHeader
          currentPage={0}
          onSearchChange={this.searchChanged}
          searchText={this.state.searchText}
        />
        <List>
          {this.state.searchResult.map(a => (
            <UserListItem user={a} />
          ))}
        </List>
      </React.Fragment>
    );
  }
}
export default SearchUserPage;
