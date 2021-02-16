import {
  Container,
  IconButton,
  Box,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
interface SearchHeaderProps {
  currentPage?: number;
  searchText?: string;
  onSearchChange?: any;
}
function SearchHeader(props: SearchHeaderProps) {
  const styles = {
    textField: {
      flexGrow: 1,
    },
  };
  const history = useHistory();
  const userTabClicked = () => {
    history.push('/search/user');
  };
  const clubTabClicked = () => {
    history.push('/search/club');
  };
  const onBackClick = () => {
    window.location.href = '/';
  };
  return (
    <Box>
      <Box width="100%" display="flex">
        <IconButton onClick={onBackClick}>
          <ArrowBack />
        </IconButton>
        <TextField
          variant="outlined"
          style={styles.textField}
          onChange={e => props.onSearchChange(e.target.value)}
          value={props.searchText}
        />
      </Box>
      <Tabs value={props.currentPage} variant="fullWidth">
        <Tab label="User" id="user-tab" onClick={userTabClicked} />
        <Tab label="Club" id="club-tab" onClick={clubTabClicked} />
      </Tabs>
    </Box>
  );
}
export default SearchHeader;
