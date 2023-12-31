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
    const formattedDob = formatDate(dob);
    const array = formattedDob.split(' ');
    const dobObject = {
      day: array[0],
      month: array[1],
      year: array[2],
    };
    return dobObject;
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

export function profileFormValidation(profileInput) {
  if (!profileInput.name || !profileInput.dob || !profileInput.gender)
    return false;
  else return true;
}

export function profileDobValidation(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  if (dob > currentDate) return false;
  else return true;
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const friendsFilter = (friends, query) => {
    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
  };

export function getAgeAndSuffix (dob) {
    const age = calculateAge(dob); // calculates age

    // if age is between 10 and 20 (inclusive) returns 'th'
    if (age >= 10 && age <= 20) return `${age}th`;

    // finds last digit
    const lastDigit = age % 10;
    // reference of alternate suffixes
    const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' }

    // returns age with the corresponding value to the last digit key, if no match, returns 'th' by default
    return `${age}${suffixes[lastDigit] || 'th'}`
}