import moment from "moment";

function getDeadlineDifference(deadline) {
  const now = moment();
  const diff = moment(deadline).diff(now);
  if (diff < 0) {
    return "0 Days 0 Hours 0 Minutes";
  }
  const duration = moment.duration(diff);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const diffString = `${days} Days ${hours} Hours ${minutes} Minutes`;
  return diffString;
}

export default getDeadlineDifference;
