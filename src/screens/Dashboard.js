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



const sizePage = (window.innerWidth || 800) * 0.85
console.log("Size", sizePage)
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
            width={sizePage}
            height={350}
            data={this.state.cycles}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis dataKey="totalHours" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalHours" fill="#8884d8" />
          </BarChart>
        </Paper>
      </div>
    );
  }
}

const handleCycleByTotalHour = (cycles) => {
  let groupSubject = [];
  let result = [];
  if (cycles) {
    groupSubject = _values(_groupBy(cycles, 'subject'));
    groupSubject.map((subjectItem, index) => {
      let totalHourBySubject = 0;
      let totalMinutesBySubject = 0;
      let subject;
      let totalHour = 0;

      subjectItem.map((item, index) => {
        let time = sumTotalHours(item.studyHour);
        let hour = time.hour;
        let minutes = time.minutes;

        totalHourBySubject += hour;
        totalMinutesBySubject += minutes;

        subject = item.subject;
      })

      totalHour = calcTotalHourAndMinutes(totalHourBySubject, totalMinutesBySubject)

      result.push({
        subject: subject,
        totalHours: parseFloat(totalHour)
      })
    })
  }
  return result;
}

function calcTotalHourAndMinutes(hour, minutes) {
  let total = hour;
  let remainMinutes = 0;
  // console.log("Hour", hour)
  // console.log("minutes", minutes)
  if (minutes > 60) {
    let totalHour = minutes / 60;
    let intHour = Math.floor(totalHour);
    remainMinutes = totalHour % 1

    total += intHour
  }
  return `${total}.${Math.floor(remainMinutes * 60)}`
}


const sumTotalHours = (hours) => {
  const time = hours.split(':');
  const hour = parseInt(time[0], 10) || 0;
  const minutes = parseInt(time[1], 10) || 0;
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
