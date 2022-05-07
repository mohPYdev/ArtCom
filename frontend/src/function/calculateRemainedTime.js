export default function calculateRemainedTime(end) {
  var time_list = end.slice(0, 10).split("-");
  var end_year = time_list[0];
  var end_month = time_list[1];
  var end_day = time_list[2];
  time_list = end.slice(11, 19).split(":");
  var end_hour = time_list[0];
  var end_min = time_list[1];
  var end_sec = time_list[2];
  var today = new Date();
  var time_str = `  سال : ${+end_year - +today.getFullYear()}
    ماه : ${Math.abs(+end_month - (+today.getMonth() + 1))}
    روز : ${Math.abs(+end_day - +today.getDate())}
    ساعت : ${Math.abs(+end_hour - +today.getHours())}
    دقیقه : ${Math.abs(+end_min - (+today.getMinutes() + 1))}
    ثانیه : ${Math.abs(+end_sec - (+today.getSeconds() + 1))}`;
  return time_str;
}
