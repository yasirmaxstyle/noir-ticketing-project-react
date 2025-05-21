function convertDate(date, day) {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let [yy, mm, dd] = date.split('-');
  mm = month[mm - 1];
  if (!day) return `${mm} ${yy}`
  return `${mm} ${dd}, ${yy}`;
}


export default convertDate