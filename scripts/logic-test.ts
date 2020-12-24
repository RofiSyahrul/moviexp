/* eslint-disable no-console */
function isAnagram(str1: string, str2: string) {
  if (str1.length !== str2.length) return false;
  const { length } = str1;
  let count = 0;

  const str1LowerCase = str1.toLowerCase();
  const str2LowerCase = str2.toLowerCase();
  for (let i = 0; i < length; i += 1) {
    count += str1LowerCase.charCodeAt(i) - str2LowerCase.charCodeAt(i);
  }

  return count === 0;
}

function getAnagrams(...args: string[]) {
  const { length } = args;
  if (length === 0) return [[]];

  const store = [[args[0]]];

  for (let i = 1; i < length; i += 1) {
    const str = args[i];
    const totalStore = store.length;
    let isStrAnagramToOneOfWOrds = false;
    for (let idxStore = 0; idxStore < totalStore; idxStore += 1) {
      if (isAnagram(str, store[idxStore][0])) {
        isStrAnagramToOneOfWOrds = true;
        store[idxStore].push(str);
        break;
      }
    }
    if (!isStrAnagramToOneOfWOrds) {
      store.push([str]);
    }
  }

  return store;
}

console.log(getAnagrams('kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'));
