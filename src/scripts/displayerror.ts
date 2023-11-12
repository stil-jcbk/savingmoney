export default function displayError(errorNumber: number) {
  /*
  ERROR LIST:
  1. ActionDialog error (wrong selection/input)
  2. History loading error
  3. Not enough balance to make a withdraw
  4. NewGoal error (invalid goal value)
  5. Complete goal error (insufficient balance)
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
    case 4:
      errorMessage = "Error #4\nInvalid goal value";
      break;
    case 5:
      errorMessage = "Error #5\nInsufficient balance";
      break;
    default:
      errorMessage = "Unknown error";
      break;
  }
  alert(errorMessage);
  return;
}