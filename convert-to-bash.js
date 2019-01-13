const TEMPLATE_ARRAY = [
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 3, 2, 1, 0]
]; //This should be a gradiented box.

const README_TEMPLATE = `#My Github Art
Created using [git-art](https://github.com/jamesjarvis/git-art)`;

/*
Get the start date - so the first sunday 1 year ago.
*/
function getStartDate() {
  let startDate = new Date();
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
  startDate.setUTCHours(12);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);
  let weekDay = startDate.getUTCDay();

  while (weekDay !== 0) {
    startDate.setUTCDate(startDate.getUTCDate() + 1);
    weekDay = startDate.getUTCDay();
  }

  return startDate;
}

/* 
Returns a string of commit information for that day, based on the number of commits requested.
*/
function commit(date, commits) {
  let commitDate = date;
  let dayCommitInstructions = [];
  for (i = 0; i < commits; i++) {
    dayCommitInstructions.push(
      `GIT_AUTHOR_DATE=${commitDate.toUTCString()} GIT_COMMITTER_DATE=${commitDate.toUTCString()}
      git commit --allow-empty -m "git-art" > /dev/null`);
      commitDate.setUTCMinutes(commitDate.getUTCMinutes() + 1);
  }
  // console.log(commitInstructions.join('\n'));
  return dayCommitInstructions;
}

/* 
This function should convert the supplied 2d array from the parameter into a bash script which can be run by the user.
The bash script should take the 2d array, create a git repo with the required commits and then upload it to the repo specified.
*/
function generateBash(image_array, multiplier=1) {
  let startDate = getStartDate();
  const length = Math.min(...image_array.map(x => x.length));
  let commitInstructions = [];
  for (week = 0; week < length; week++) {
    for (day = 0; day < image_array.length; day++) {
      const daysCommits = commit(startDate, image_array[day][week] * multiplier);
      if (daysCommits.length > 0) {
        commitInstructions.push(daysCommits.join('\n'));
      }
      // console.log(image_array[day][week]);
      startDate.setDate(startDate.getDate() + 1);
    }
  }
  return commitInstructions.join('\n');
}

console.log(generateBash(TEMPLATE_ARRAY));
