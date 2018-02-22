import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as courseAction from '../actions/courseActions';
import { bindActionCreators } from 'redux';

const style = {
  margin: '12px',
};

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {title: 'Rohan Rules'},
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAddCourses = this.onAddCourses.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onAddCourses() {
    this.props.actions.createCourse(this.state.course);
  }
  courseRow(course, index) {
    return (
      <div key={index}>{course.title}</div>
    );
  }

  render() {
    return (
      <div style={style}>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={this.state.course.title}
          onChange={this.onTitleChange}
        />
        <RaisedButton onClick={this.onAddCourses} label="Primary" primary={true} style={style} />
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
