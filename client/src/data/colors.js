export const colors = [
  // "#f96248", //orange
  // "#fe68ce", //pink
  // "#4cddfe", //blue
  // "#8266cf", //purple
  // "#45B69C",
  // "#28C2FF",
  // "#3066BE",
  "#FF003C",
  // "red",
  // "green",
  // "blue",
];

export const generateRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber]
}