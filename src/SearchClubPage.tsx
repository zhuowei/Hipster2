import {
  Container,
  Button,
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
import SearchHeader from './SearchHeader';
import React from 'react';
import {apiPost} from './common';

function ClubListItem(props: any) {
  const c = props.club;
  const textStyle = {
    maxHeight: '48px',
    overflow: 'hidden',
  };
  const listItemClicked = () => {
    window.location.href = '/club.html?' + c.club_id;
  };
  return (
    <ListItem onClick={listItemClicked} button>
      <ListItemAvatar>
        <Avatar src={c.photo_url} />
      </ListItemAvatar>
      <ListItemText
        primary={c.name}
        secondary={<Typography style={textStyle}>{c.description}</Typography>}
      />
    </ListItem>
  );
}

class SearchClubPage extends React.Component {
  public state = {searchResult: [], searchText: ''};
  private searchDebounce = -1;
  private searchChanged = (newText: string) => {
    this.setState({searchText: newText});
    clearTimeout(this.searchDebounce);
    this.searchDebounce = window.setTimeout(() => {
      this.doTheSearch();
    }, 500);
  };
  private async doTheSearch() {
    const originalText = this.state.searchText;
    if (originalText.length === 0) {
      this.setState({searchResult: []});
      return;
    }
    const response = await apiPost('search_clubs', {
      cofollows_only: false,
      following_only: false,
      followers_only: false,
      query: this.state.searchText,
    });
    if (originalText != this.state.searchText) {
      return;
    }
    if (response.success) {
      this.setState({searchResult: response.clubs});
    } else {
      this.setState({searchResult: []});
    }
  }
  render() {
    return (
      <React.Fragment>
        <SearchHeader
          currentPage={1}
          onSearchChange={this.searchChanged}
          searchText={this.state.searchText}
        />
        <List>
          {this.state.searchResult.map(a => (
            <ClubListItem club={a} />
          ))}
        </List>
      </React.Fragment>
    );
  }
}
export default SearchClubPage;
