function anagrams(str1, str2) {
  let set1 = new Set(str1.split(''));
  for (let i = 0; i < str2.length; i++) {
    if (!set1.has(str2[i])) {
      return false;
    }
  }
  return true;

}


function commonElements(arr1, arr2) {
  let set1 = new Set(arr1)
  return arr2.filter(element => set1.has(element))

}


function duplicate(arr) {
  let set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      return arr[i]
    } else set.add(arr[i])
  }
}


function twoSum(nums, target) {
  // Your code here
}


function wordPattern(pattern, strings) {
  // Your code here
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
