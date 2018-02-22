import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import { hashHistory  } from 'react-router';
import Button from 'material-ui/Button';
import { LOGIN_SERVER } from '../actions/apihost.js'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import { CircularProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const styles = theme => ({
  card: {
    padding: 0,
    textAlign: 'center',
    width: '350px',
    display: 'flex',
    height: 550,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    marginTop: 0,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: 0,
  },
  media: {
    height: 200,
  },
  textField: {
    width: '100%',
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowButton: 1,
      expanded: false,
      activeStep: 1,
      user_one_data: {
        username: '',
        name: '',
        followers: 0,
        following: 0,
        listed_count: 0,
        posts: 0,
        avatar: 'user.svg',
        description: ''
      },
      user_two_data: {
        username: '',
        name: '',
        followers: 0,
        following: 0,
        listed_count: 0,
        posts: 0,
        avatar: 'user.svg',
        description: ''
      },
      username_one: '',
      username_two: '',
      default_avatar: 'user.svg',
      loading_avatar: false,
      snack: false,
      snackMessage: '',
      compare_screen: false,
      open: false,
      result_name: '',
      result_avatar: '',
      disabled: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.captureUserOne = this.captureUserOne.bind(this);
    this.captureUserTwo = this.captureUserTwo.bind(this);
    this.getTwitterData = this.getTwitterData.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
  }

  componentWillMount(){
		this.props.setProperties('Home', false, 1, '');
	}

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false, disabled: false });
  }

  handleRequestClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snack: false });
  }

  captureUserOne(e) {
    this.setState({
      username_one: e.target.value
    });
  }

  captureUserTwo(e) {
    this.setState({
      username_two: e.target.value
    });
  }

  handleNext() {
    if(this.state.activeStep < 2)
      this.setState({
        activeStep: this.state.activeStep + 1,
        username_two: ''
      });
    else {
      if(this.state.user_one_data.username.length === 0 &&
        this.state.user_two_data.username.length === 0) {
          this.setState({snack: true, snackMessage: 'Please lock both users first!'});
      } else {
        this.setState({
          compare_screen: true,
        });
      }
    }
  }

  handleBack() {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }

  getTwitterData() {
    if(this.state.activeStep == 1) {
      let data = {
        username: this.state.username_one,
      };
  		var url = LOGIN_SERVER + '/twitter';
      //console.log("Request initiated.");
      this.setState({loading_avatar: true})
  		axios.post(url, data, {
  			headers: {
  				'content-type': 'application/json',
  			}
  		}).then(response => {
  			if (response.status >= 200 && response.status < 300) {
  				//console.log(response.data.data);
          let av = response.data.data.profile_image_url.replace('_normal','');
          this.setState({
            user_one_data: {
              name: response.data.data.name,
              username: response.data.data.screen_name,
              followers: response.data.data.followers_count,
              following: response.data.data.friends_count,
              listed_count: response.data.data.listed_count,
              posts: response.data.data.statuses_count,
              avatar: av,
              description: response.data.data.description
            },
            loading_avatar: false
          });
          //console.log(this.state);
  			} else {
          this.setState({loading_avatar: false,
          snack: true, snackMessage: 'Something went wrong'});
  			}
  		})
  		.catch(error => {
        this.setState({loading_avatar: false,
        snack: true, snackMessage: 'Something went wrong'});
  		});
    } else if(this.state.activeStep == 2) {
      let data = {
        username: this.state.username_two,
      };
  		var url = LOGIN_SERVER + '/twitter';
      console.log("Requested initiated.");
      this.setState({loading_avatar: true});
  		axios.post(url, data, {
  			headers: {
  				'content-type': 'application/json',
  			}
  		}).then(response => {
  			if (response.status >= 200 && response.status < 300) {
  				//console.log(response.data.data);
          let av = response.data.data.profile_image_url.replace('_normal','');
          this.setState({
            user_two_data: {
              name: response.data.data.name,
              username: response.data.data.screen_name,
              followers: response.data.data.followers_count,
              following: response.data.data.friends_count,
              listed_count: response.data.data.listed_count,
              posts: response.data.data.statuses_count,
              avatar: av,
              description: response.data.data.description
            },
            loading_avatar: false
          });
          console.log(this.state);
  			} else {
  				this.setState({loading_avatar: false,
          snack: true, snackMessage: 'Something went wrong'});
  			}
  		})
  		.catch(error => {
        this.setState({loading_avatar: false,
        snack: true, snackMessage: "User does not exist"});
  		});
    }
  }

  handleCompare() {
    let argsArr = [
      this.state.user_one_data.followers, this.state.user_one_data.following,
      this.state.user_one_data.listed_count, this.state.user_one_data.posts,
      this.state.user_two_data.followers, this.state.user_two_data.following,
      this.state.user_two_data.listed_count, this.state.user_two_data.posts,
    ]
    console.log(argsArr);
    let data = {
      args: argsArr,
    };
    this.setState({disabled: true})
    var url = LOGIN_SERVER + '/predict';
    axios.post(url, data, {
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.results);

        if(response.data.results == 0) {
          this.setState({
            open: true,
            result_name: this.state.user_two_data.name,
            result_avatar: this.state.user_two_data.avatar
          });
        } else {
          this.setState({
            open: true,
            result_name: this.state.user_one_data.name,
            result_avatar: this.state.user_one_data.avatar
          });
        }
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  clickHome() {
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    if(this.state.compare_screen) {
      return (
        <div style={{maxWidth: 760, margin: 'auto', paddingTop: 60}}>
          <h2 style={{textAlign: 'center', marginBottom: 20,
          fontWeight: 300, fontSize: 45, color: 'grey'}}>
            Let's see who's more influential
          </h2>
          <div className={classes.root}>
            <Grid spacing={24}>
              <Grid item xs={12}>
                <Paper elevation={5} square={false} className={classes.paper}>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <div className={classes.paper}>
                        <Avatar src={this.state.user_one_data.avatar}
                        style={{width: 150, height: 150}} />
                      </div>
                      <h4 style={{textAlign: 'center', marginTop: 2, marginBottom:4,
                      fontWeight: 300, fontSize: 30}}>
                        {this.state.user_one_data.name}
                      </h4>
                      <h4 style={{fontWeight: 400, fontSize: 20, color: '#c0392b'}}>
                        @{this.state.user_one_data.username}
                      </h4>
                      <p style={{fontWeight: 350, fontSize: 15, marginTop: 4}}>
                        {this.state.user_one_data.description}
                      </p>
                      <p style={{fontWeight: 450, fontSize: 12, marginTop: 0}}>
                        {this.state.user_one_data.followers} Followers
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.paper}>
                        <Avatar src={this.state.user_two_data.avatar}
                        style={{width: 150, height: 150}} />
                      </div>
                      <h4 style={{textAlign: 'center', marginTop: 2, marginBottom:4,
                      fontWeight: 300, fontSize: 30}}>
                        {this.state.user_two_data.name}
                      </h4>
                      <h4 style={{fontWeight: 400, fontSize: 20, color: '#c0392b'}}>
                        @{this.state.user_two_data.username}
                      </h4>
                      <p style={{fontWeight: 350, fontSize: 15, marginTop: 4}}>
                        {this.state.user_two_data.description}
                      </p>
                      <p style={{fontWeight: 450, fontSize: 12, marginTop: 0}}>
                        {this.state.user_two_data.followers} Followers
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <MuiThemeProvider theme={theme}>
                        <Button raised color="default" disabled={this.state.disabled}
                          className={classes.button} onClick={this.handleCompare}>
                          Compare
                        </Button>
                      </MuiThemeProvider>
                      <Button onClick={this.clickHome.bind(this)} color="primary" autoFocus>
                        Home
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">More influential persion is {this.state.result_name}</DialogTitle>
            <DialogContent>
              <Avatar src={this.state.result_avatar}
              style={{width: 100, height: 100}} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div style={{width: '100%', display: 'flex',
        justifyContent: 'center', paddingTop: 30}}>
          <Card elevation={5} square={false} className={classes.card}>
            <div style={{height: '50%', width: '100%', padding: 20,
            background: 'linear-gradient(45deg, #E91E63 10%, #64FFDA 90%)'}}>
              <h2 style={{textAlign: 'center', marginBottom: 0,
              fontWeight: 300, fontSize: 35}}>
                Let's see who's more influential
              </h2>
              <div>
                {
                  this.state.activeStep == 1 ?
                  <div className={classes.paper}>
                    {
                      !this.state.loading_avatar ?
                      <Avatar src={this.state.user_one_data.avatar}
                      style={{width: 100, height: 100}} /> :
                      <CircularProgress color="primary"/>
                    }
                  </div> :
                  <div className={classes.paper}>
                    {
                      !this.state.loading_avatar ?
                      <Avatar src={this.state.user_two_data.avatar}
                      style={{width: 100, height: 100}} /> :
                      <CircularProgress color="accent"/>
                    }
                  </div>
                }
              </div>
              <div>
                {
                  this.state.activeStep == 1 ?
                  <h2 style={{textAlign: 'center',
                  fontWeight: 500, fontSize: 16, color: '#000000'}}>
                    {this.state.user_one_data.name}
                  </h2> :
                  <h2 style={{textAlign: 'center',
                  fontWeight: 500, fontSize: 16, color: '#000000'}}>
                    {this.state.user_two_data.name}
                  </h2>
                }
              </div>
            </div>
            <div style={{height: '50%', width: '100%', position: 'relative'}}>
              <div style={{padding: 20, marginTop: 28}}>
                <h2 style={{textAlign: 'center', marginTop: 2, marginBottom:0,
                fontWeight: 300, fontSize: 18, color: '#263238'}}>
                  {this.state.activeStep == 1 ?
                    "Please enter the username of first Twitterati" :
                    "Now type the username of the second Twitterati"
                  }
                </h2>
                <div>
                  {this.state.activeStep == 1 ?
                    <TextField
                      id="user_one"
                      label="Username"
                      className={classes.textField}
                      placeholder="elonmusk"
                      autoFocus={true}
                      value={this.state.username_one}
                      onChange={this.captureUserOne}
                      margin="normal"/> :
                    <TextField
                      id="user_two"
                      label="Username"
                      className={classes.textField}
                      placeholder="BillGates"
                      autoFocus={true}
                      value={this.state.username_two}
                      onChange={this.captureUserTwo}
                      margin="normal"/>
                  }
                </div>
                <MuiThemeProvider theme={theme}>
                  <Button onClick={this.getTwitterData} raised dense className={classes.button}>
                    Lock
                  </Button>
                </MuiThemeProvider>
              </div>
              <MobileStepper
                type="progress"
                steps={3}
                style={{position: 'absolute', bottom: '2px', width: '100%'}}
                position="static"
                activeStep={this.state.activeStep}
                nextButton={
                  <Button dense onClick={this.handleNext} disabled={this.state.activeStep > 2}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 1}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
              }/>
            </div>
          </Card>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snack}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<h6 id="message-id">{this.state.snackMessage}</h6>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose}>
              <CloseIcon />
            </IconButton>,
          ]}/>
        </div>
      );
    }
  }
};

export default withStyles(styles)(Home);
