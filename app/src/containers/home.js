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
        avatar: 'https://pixabay.com/en/photos/avatar/',
        description: ''
      },
      user_two_data: {
        username: '',
        name: '',
        followers: 0,
        following: 0,
        listed_count: 0,
        posts: 0,
        avatar: 'https://pixabay.com/en/photos/avatar/',
        description: ''
      },
      username_one: '',
      username_two: '',
      default_avatar: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRv%0D%0AcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVy%0D%0Ac2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIg%0D%0AeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3%0D%0Ady53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDUxMiA1%0D%0AMTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9%0D%0AInByZXNlcnZlIj4KPGNpcmNsZSBzdHlsZT0iZmlsbDojNzFFMkVGOyIgY3g9IjI1NiIgY3k9IjI1%0D%0ANiIgcj0iMjU2Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMzOEM2RDk7IiBkPSJNMzU2LjcwNSwxMTku%0D%0AODExbC0zMS40NjEsMzkuNjVsLTg3LjkyMSwxODguMjgyTDExMy43NzgsNDY4Ljg3OGwwLDAKCUMx%0D%0ANTQuNDU4LDQ5Ni4xMTEsMjAzLjM3MSw1MTIsMjU2LDUxMmMxMzUuMTg0LDAsMjQ1Ljg4MS0xMDQu%0D%0ANzg0LDI1NS4zMzMtMjM3LjU2MUwzNTYuNzA1LDExOS44MTF6Ii8+CjxyZWN0IHg9IjIxMy4zMzMi%0D%0AIHk9IjI5Mi4yMTkiIHN0eWxlPSJmaWxsOiNGQ0QwODg7IiB3aWR0aD0iODUuMzMzIiBoZWlnaHQ9%0D%0AIjg1LjMzMyIvPgo8cmVjdCB4PSIyNTUuNDMxIiB5PSIyOTIuMjE5IiBzdHlsZT0iZmlsbDojRERB%0D%0AQjYyOyIgd2lkdGg9IjQzLjIzNiIgaGVpZ2h0PSI4NS4zMzMiLz4KPHBhdGggc3R5bGU9ImZpbGw6%0D%0AI0Q5RURFQzsiIGQ9Ik0xOTkuNDU2LDM1MS40NTRsLTQ1LjIyLDkuMDQ0Yy0yMy4wMjQsNC42MDYt%0D%0AMzkuNTk2LDI0LjgyMS0zOS41OTYsNDguM3Y1OS44MDkKCWM0MC40MzIsMjcuMDY3LDg5LjA1LDQy%0D%0ALjg2MSwxNDEuMzYsNDIuODYxczEwMC45MjgtMTUuNzk0LDE0MS4zNi00Mi44NjF2LTU5LjgwOWMw%0D%0ALTIzLjQ4LTE2LjU3Mi00My42OTYtMzkuNTk2LTQ4LjNsLTQ1LjIyLTkuMDQ0CglsLTcuOTkyLTEx%0D%0ALjY2NmMtMS40OTYtMi4xODQtNC4zMjctMy4wMDctNi43NTktMS45NjVMMjU2LDM1NS44M2wtNDEu%0D%0ANTQzLTE3Ljk4N2MtMi40MTUtMS4wNTMtNS4yMzktMC4yNjItNi43NTQsMS44OTMKCUwxOTkuNDU2%0D%0ALDM1MS40NTR6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNBOUJGQkU7IiBkPSJNMzU3Ljc2NCwzNjAu%0D%0ANWwtNDUuMjItOS4wNDRsLTcuOTkyLTExLjY2NmMtMS40OTYtMi4xODQtNC4zMjctMy4wMDctNi43%0D%0ANTktMS45NjVMMjU2LDM1NS44MwoJbC0wLjU3NC0wLjI0OHYxNTUuODc3YzAuMTkxLDAsMC4zODEs%0D%0AMC4wMSwwLjU3NCwwLjAxYzUyLjMxLDAsMTAwLjkyOC0xNS43OTQsMTQxLjM2LTQyLjg2MXYtNTku%0D%0AODA5CglDMzk3LjM2LDM4NS4zMTksMzgwLjc4OCwzNjUuMTA0LDM1Ny43NjQsMzYwLjV6Ii8+Cjxw%0D%0AYXRoIHN0eWxlPSJmaWxsOiNGRkVEQjU7IiBkPSJNMzQ3LjUzMSwyMDUuNDRjMC40NTktNC4yNDQs%0D%0AMC42OTgtOC40MjgsMC42OTgtMTIuNTA5YzAtNTMuOTc0LTQxLjI5My05Ny43MjgtOTIuMjI5LTk3%0D%0ALjcyOAoJcy05Mi4yMjksNDMuNzUzLTkyLjIyOSw5Ny43MjhjMCw0LjA4LDAuMjQsOC4yNjQsMC42%0D%0AOTgsMTIuNTA5Yy04Ljk0NSwyLjMyNi0xMy4yMDIsMTYuMDg3LTkuNTA2LDMwLjgxNwoJYzMuNzA4%0D%0ALDE0Ljc3NiwxNC4wMTQsMjQuOTIxLDIzLjAxOCwyMi42NjFjMC44MjEtMC4yMDUsMS41ODYtMC41%0D%0AMzgsMi4zMjYtMC45MjdjMTYuNjY3LDMzLjQ1Miw0NC4zNTEsNjAuNTk0LDc1LjY5Myw2MC41OTQK%0D%0ACXM1OS4wMjctMjcuMTM5LDc1LjY5My02MC41OTRjMC43NCwwLjM5LDEuNTA1LDAuNzIyLDIuMzI2%0D%0ALDAuOTI3YzkuMDA0LDIuMjYsMTkuMzA5LTcuODg1LDIzLjAxOC0yMi42NjEKCUMzNjAuNzMyLDIy%0D%0AMS41MjcsMzU2LjQ3NiwyMDcuNzYzLDM0Ny41MzEsMjA1LjQ0eiIvPgo8cGF0aCBzdHlsZT0iZmls%0D%0AbDojRThDRjg5OyIgZD0iTTM0Ny41MzEsMjA1LjQ0YzAuNDU5LTQuMjQ0LDAuNjk4LTguNDI4LDAu%0D%0ANjk4LTEyLjUwOWMwLTUzLjk3NC00MS4yOTMtOTcuNzI4LTkyLjIyOS05Ny43MjgKCWMtMC4xOTMs%0D%0AMC0wLjM4MSwwLjAxNC0wLjU3NCwwLjAxNnYyMjMuMzQ5YzAuMTkxLDAuMDAyLDAuMzgzLDAuMDE2%0D%0ALDAuNTc0LDAuMDE2YzMxLjM0MiwwLDU5LjAyNy0yNy4xMzksNzUuNjkzLTYwLjU5NAoJYzAuNzQs%0D%0AMC4zOSwxLjUwNSwwLjcyMiwyLjMyNiwwLjkyN2M5LjAwNCwyLjI2LDE5LjMwOS03Ljg4NSwyMy4w%0D%0AMTgtMjIuNjYxQzM2MC43MzIsMjIxLjUyNywzNTYuNDc2LDIwNy43NjMsMzQ3LjUzMSwyMDUuNDR6%0D%0AIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiM0OTQ5NDg7IiBkPSJNMjA0LjE0LDE3MC42NjdjMCwwLDQw%0D%0ALjA4MSwzOC4zNTcsMTIxLjk2NiwyNC41NjZjMCwwLDcuOTQtMS45OTgsMjEuNDI1LDEwLjIwNwoJ%0D%0AYzAsMCwyMi41MzUtMzIuNjE4LDkuMTc1LTg1LjYyOGMwLDAtNDEuMzc0LTEzLjM2LTYwLjc2OC0y%0D%0ANS40MjhjLTE5LjM5NC0xMi4wNjctNzEuMTExLTI0Ljk5Ny04Mi43NDcsMTEuMjA1CgljMCwwLTM3%0D%0ALjQ5NS00Ljc0MS00Ny44MzgsMzQuMDQ3Yy0xMC4zNDMsMzguNzg4LTAuODgzLDY1LjgwMy0wLjg4%0D%0AMyw2NS44MDNTMTgzLjg4NCwxNTguNTk5LDIwNC4xNCwxNzAuNjY3eiIvPgo8cGF0aCBzdHlsZT0i%0D%0AZmlsbDojMjgyODI2OyIgZD0iTTM1Ni43MDUsMTE5LjgxMWMwLDAtNDEuMzc0LTEzLjM2LTYwLjc2%0D%0AOC0yNS40MjhjLTguOTc1LTUuNTg0LTI0Ljg2OS0xMS4zNDMtNDAuNTEyLTEyLjM0MXYxMTIuMzc2%0D%0ACgljMTguNDkyLDQuMDcsNDIuMDE1LDUuNjQyLDcwLjY4LDAuODE1YzAsMCw3Ljk0LTEuOTk4LDIx%0D%0ALjQyNSwxMC4yMDdDMzQ3LjUzMSwyMDUuNDQsMzcwLjA2NiwxNzIuODIyLDM1Ni43MDUsMTE5Ljgx%0D%0AMXoiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0I3Q0VDQzsiIHBvaW50cz0iMjU2LDQ4MS40NjEg%0D%0AMjExLjMyLDQwMS4yOTEgMjU2LDM1Ni43NTIgMzAwLjY4LDQwMS4yOTEgIi8+Cjxwb2x5Z29uIHN0%0D%0AeWxlPSJmaWxsOiM4RUE1QTI7IiBwb2ludHM9IjMwMC42OCw0MDEuMjkxIDI1NiwzNTYuNzUyIDI1%0D%0ANS40MjYsMzU3LjMyNCAyNTUuNDI2LDQ4MC40MyAyNTYsNDgxLjQ2MSAiLz4KPHBvbHlnb24gc3R5%0D%0AbGU9ImZpbGw6IzM4Njg5NTsiIHBvaW50cz0iMjc0LjY3NywzNzUuNTEzIDI1NiwzNTYuNzUyIDIz%0D%0ANy4zMjMsMzc1LjUxMyAyNDcuODExLDM4OC45OTIgMjQ3LjgxMSw0NzAuNDExIAoJMjY0LjE4OSw0%0D%0ANzAuNDExIDI2NC4xODksMzg4Ljk5MiAiLz4KPGc+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMjcz%0D%0AQjdBOyIgcG9pbnRzPSIyNTYsMzU2Ljc1MiAyNTUuNDI2LDM1Ny4zMjkgMjU1LjQyNiw0NzAuNDEx%0D%0AIDI2NC4xODksNDcwLjQxMSAyNjQuMTg5LDM4OC45OTIgCgkJMjc0LjY3NywzNzUuNTEzIAkiLz4K%0D%0ACTxwYXRoIHN0eWxlPSJmaWxsOiMyNzNCN0E7IiBkPSJNMzU4LjM4NCwzNjAuMTA4bC0zNS44MDct%0D%0ANi42ODJMMjU2LDQ2Ni42NzNsLTY2LjY1NS0xMTMuMTk3bC0zNS43Myw2LjYzMgoJCWMtMjMuMTY0%0D%0ALDQuNjM0LTM5LjgzOCwyNC45NzItMzkuODM4LDQ4LjU5NXY2MC4xNzVDMTU0LjQ1Nyw0OTYuMTA5%0D%0ALDIwMy4zNzEsNTEyLDI1Niw1MTJzMTAxLjU0My0xNS44OTEsMTQyLjIyMi00My4xMjJ2LTYwLjE3%0D%0ANQoJCUMzOTguMjIyLDM4NS4wODEsMzgxLjU0OSwzNjQuNzQyLDM1OC4zODQsMzYwLjEwOHoiLz4K%0D%0APC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojMTIxMTQ5OyIgZD0iTTM1OC4zODQsMzYwLjEwOGwtMzUu%0D%0AODA3LTYuNjgyTDI1Niw0NjYuNjczbC0wLjU3NC0wLjk3NnY0Ni4yOWMwLjE5MSwwLDAuMzgxLDAu%0D%0AMDEsMC41NzQsMC4wMQoJYzUyLjYyOSwwLDEwMS41NDMtMTUuODkxLDE0Mi4yMjItNDMuMTIydi02%0D%0AMC4xNzNDMzk4LjIyMiwzODUuMDgxLDM4MS41NDksMzY0Ljc0MiwzNTguMzg0LDM2MC4xMDh6Ii8+%0D%0ACjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjxn%0D%0APgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8%0D%0AL2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
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
                          {
                            this.state.disabled ? "Please wait..." : "Compare"
                          }
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
