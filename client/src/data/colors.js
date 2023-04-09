export const colors = [
  "#f96248", //orange
  "#fe68ce", //pink
  "#4cddfe", //blue
  "#8266cf", //purple
  // "red",
  // "green",
  // "blue",
];

export const generateRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber]
}