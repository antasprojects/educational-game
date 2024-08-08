const addSecondsToTime = (datetimeStr, secondsToAdd) => {
  // Parse the input string into a Date object
  const [datePart, timePart] = datetimeStr.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  // Create a Date object from the parsed values
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Add the specified number of seconds
  date.setSeconds(date.getSeconds() + secondsToAdd);

  // Format the updated Date object back to a string
  const updatedYear = date.getFullYear();
  const updatedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const updatedDay = String(date.getDate()).padStart(2, "0");
  const updatedHour = String(date.getHours()).padStart(2, "0");
  const updatedMinute = String(date.getMinutes()).padStart(2, "0");
  const updatedSecond = String(date.getSeconds()).padStart(2, "0");

  const updatedDatetimeStr = `${updatedYear}-${updatedMonth}-${updatedDay} ${updatedHour}:${updatedMinute}:${updatedSecond}`;

  return updatedDatetimeStr;
}

module.exports = { addSecondsToTime }