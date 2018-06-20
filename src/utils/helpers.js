import _groupBy from 'lodash/groupBy';
import _values from 'lodash/values';

const handleCycleByTotalHour = cycles => {
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
      });

      totalHour = calcTotalHourAndMinutes(
        totalHourBySubject,
        totalMinutesBySubject
      );

      result.push({
        subject: subject,
        totalHours: parseFloat(totalHour)
      });
    });
  }
  return result;
};

function calcTotalHourAndMinutes(hour, minutes) {
  let total = hour;
  let remainMinutes = 0;
  // console.log("Hour", hour)
  // console.log("minutes", minutes)
  if (minutes > 60) {
    let totalHour = minutes / 60;
    let intHour = Math.floor(totalHour);
    remainMinutes = totalHour % 1;

    total += intHour;
  }
  return `${total}.${Math.floor(remainMinutes * 60)}`;
}

const sumTotalHours = hours => {
  const time = hours.split(':');
  const hour = parseInt(time[0], 10) || 0;
  const minutes = parseInt(time[1], 10) || 0;
  const fullTime = {
    hour: hour,
    minutes: minutes
  };
  return fullTime;
};

const sumHoursByYear = data => {
  let result = [];
  if (data) {
    
    data.map((items, index) => {
   
      let totalHourBySubject = 0;
      let totalMinutesBySubject = 0;
      let year;
      let totalHour = 0;
    
      //Each Cycle By Year Sum total hours
      items.cycles.map((item, index) => {
        let time = sumTotalHours(item.studyHour);
        let hour = time.hour;
        let minutes = time.minutes;

        totalHourBySubject += hour;
        totalMinutesBySubject += minutes;
        year = item.startDate.split("/").reverse()[0]
      });

      totalHour = calcTotalHourAndMinutes(
        totalHourBySubject,
        totalMinutesBySubject
      );

      result.push({
        year: year,
        totalHours: parseFloat(totalHour)
      });
    });
  }
  return result;
};

export { handleCycleByTotalHour, calcTotalHourAndMinutes, sumTotalHours, sumHoursByYear };
