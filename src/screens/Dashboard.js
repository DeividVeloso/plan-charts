import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { connect } from 'react-redux';
import _groupBy from 'lodash/groupBy'
import _values from 'lodash/values'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3
  })
});


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cycles: []
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.plan) {
      const cycles = handleCycleByTotalHour(nextProps.plan.cycles)
      return {
        cycles: cycles
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Meus estudos
          </Typography>
          <BarChart
            width={1200}
            height={350}
            data={this.state.cycles}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalHours" fill="#8884d8" />
          </BarChart>
        </Paper>
      </div>
    );
  }
}

const handleCycleByTotalHour = (cycles) =>{
  let groupSubject = [];
  let result = [];
  if (cycles) {
    groupSubject = _values(_groupBy(cycles, 'subject'));
    groupSubject.map((subjectItem, index) => {
      let totalHourBySubject = 0;
      let subject;
      subjectItem.map((item, index) => {
        let hour = sumTotalHours(item.studyHour);
        totalHourBySubject += hour.hour;
        subject = item.subject;
      })
      result.push({
        subject: subject,
        totalHours: totalHourBySubject
      })
    })
  }
  return result;
}

const sumTotalHours = (hours) => {
  const time = hours.split(':');
  const hour = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  const fullTime = {
    hour: hour,
    minutes: minutes
  }
  return fullTime
}

const mapStateToProps = state => {
  return {
    plan: state.planStudy.data
  };
};

const DashboardDefault = connect(
  mapStateToProps,
  null
)(Dashboard);

export default withStyles(styles)(DashboardDefault);
