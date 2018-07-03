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
  Legend,
  Cell
} from 'recharts';
import { connect } from 'react-redux';
import { handleCycleByTotalHour, sumHoursByYear } from '../utils/helpers'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3
  })
});

const colors = ['#27634c','#ae28b7','#28b73b','#b73d28','#2840b7','#27634c','#ae28b7','#28b73b','#b73d28','#2840b7','#27634c','#ae28b7','#28b73b','#b73d28','#2840b7','#27634c','#ae28b7','#28b73b','#b73d28','#2840b7']

const sizePage = (window.innerWidth || 800) * 0.85

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
    console.log(this.props.plan)
    //Muitas cores para cada barra
    //https://github.com/recharts/recharts/issues/43
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Meus estudos de 2016 até {new Date().getFullYear()}
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
            <Bar dataKey="totalHours">
              {
                this.state.cycles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} strokeWidth={index === 2 ? 4 : 1} />
                ))
              }
            </Bar>
          </BarChart>
        </Paper>
        {this.props.plan && this.props.plan.totalHourByYear ?
          <Paper className={classes.root} style={{ display: 'flex' }} elevation={4}>
            <Typography variant="headline" component="h3">
              Total de horas em:
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }} >
              {this.props.plan.totalHourByYear.map(item => {
                return (
                  <Typography variant="headline" component="h3">
                    {item.year} - {item.totalHours}
                  </Typography>
                )
              })}
            </div>
          </Paper> : null}
      </div>
    );
  }
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
