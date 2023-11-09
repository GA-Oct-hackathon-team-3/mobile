export function daysUntilBirthday(dob) {
    const birthday = new Date(dob);
    const currentDate = new Date();
  
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    );
  
    // If the next birthday is before the current date, set it to next year
    if (nextBirthday < currentDate) {
      nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
  
    // Calculate the time difference in milliseconds
    const timeDifference = nextBirthday - currentDate;
  
    // Convert milliseconds to days
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  }

export function formatDate(dateString) {
    const months = [
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
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  }

  export function splitDOB(dob) {
    const array = dob.split("-");
    if (array[2].charAt(0) === '0') array[2] = array[2].substring(1);
    const dobObject = {
      year: array[0],
      month: numericMonthToString([array[1]]),
      day: array[2],
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