export function daysUntilBirthday(dob) {
  const birthday = new Date(dob);
  const currentDate = new Date();

  birthday.setFullYear(currentDate.getFullYear());

  // If the next birthday is before the current date, set it to next year
  if (birthday < currentDate)
    birthday.setFullYear(currentDate.getFullYear() + 1);

  // Calculate the time difference in milliseconds
  const timeDifference = birthday - currentDate;

  // Convert milliseconds to days
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (days > 365) return 0;
  return days;
}

export function test(dob) {
  console.log(dob);
  const array = dob.split("-");
  console.log("ARRAY DOB", array);
  const dobObject = {
    year: array[0],
    month: numericMonthToString([array[1]]),
    day: array[2],
  };
  return dobObject;
}

export function splitDOB(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getUTCDate();
  const dobObject = {
    year: year,
    month: numericMonthToString(month),
    day: day,
  };
  return dobObject;
}

function numericMonthToString(month) {
  const monthString = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month >= 1 && month <= 12) {
    return monthString[month - 1];
  } else {
    return "Invalid Month";
  }
}

export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();

  const years = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday for this year has occurred or not
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    return years - 1; // Subtract 1 if the birthday hasn't occurred yet this year
  }

  return years;
}
