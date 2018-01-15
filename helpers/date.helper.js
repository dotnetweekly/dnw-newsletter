const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const dateHelper = {
  formatDate: function(value) {
    const date = new Date(value);
    if (value) {
      return `${
        dayNames[date.getDay()]
      }, ${date.getFullYear()}-${date.getMonth() + 1}-${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }`;
    }
  }
};

module.exports = dateHelper;
