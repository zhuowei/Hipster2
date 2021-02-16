import {Container, Button, TextField} from '@material-ui/core';
function LoginPage() {
  return (
    <Container>
      <form>
        <Button>Next</Button>
      </form>
      <form>
        <TextField variant="outlined" />
        <Button>Next</Button>
      </form>
    </Container>
  );
}
export default LoginPage;
