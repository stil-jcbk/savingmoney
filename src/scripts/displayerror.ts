export default function displayError(errorNumber: number) {
  /*
  ERROR LIST:
  1. ActionDialog error (wrong selection/input)
  2. History loading error
  3. Not enough balance to make a withdraw
  */
  let errorMessage = "";

  switch (errorNumber) {
    case 1:
      errorMessage = "Error #1\nInvalid selection or input value";
      break;
  
    case 2:
      errorMessage = "Error #2\nHistory database is missing";
      break;

    case 3:
      errorMessage = "Error #3\nNot enough balance to make a withdraw";
      break;
    default:
      errorMessage = "Unknown error";
      break;
  }
  alert(errorMessage);
  return;
}