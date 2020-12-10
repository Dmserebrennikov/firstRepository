let arr = [
  [1, 2, 3],
  [2, 3, 4, 5],
  [4, 5, 6],
];

function solve(arr) {
  function getNumberInCellWithConflict(arr) {
    function getlongestElem(array) {
      return Math.max(...array.map(item => item.length));
    }

    function findNumbersInCells(arr) {
      let arrResults = [];

      for (let cellIndex = 0; cellIndex < arr.length; cellIndex++) {
        let cellResults = [];
        for (let num of arr[cellIndex]) {
          let inCells = [];
          for (
            let comparedCellIndex = 0;
            comparedCellIndex < arr.length;
            comparedCellIndex++
          ) {
            if (comparedCellIndex == cellIndex) continue;
            for (let comparedNum of arr[comparedCellIndex]) {
              if (num == comparedNum) inCells.push(comparedCellIndex);
            }
          }
          cellResults.push(inCells);
        }
        arrResults.push(cellResults);
      }

      return arrResults;
    }

    function getConflictNumbers(index) {
      let maxlngth = getlongestElem(arrResults[index]);
      let tmp = null;
      let res = [];
      for (let item = 0; item < arrResults[index].length; item++) {
        if (
          arrResults[index][item].length == maxlngth &&
          arrResults[index][item].toString() != tmp
        ) {
          res.push(arr[index][item]);
          tmp = arrResults[index][item].toString();
        }
      }
      return res.length > 1 ? res : '';
    }

    function findCells(i, numbersInSearch) {
      console.log('numbersInSearch: ', numbersInSearch);
      let conflictedArray = [arr[i]];
      numbersInSearch.forEach(n => {
        let searchedIndex = arrResults[i][arr[i].indexOf(n)];
        searchedIndex.forEach(item => conflictedArray.push(arr[item]));
      });
      return conflictedArray;
    }

    // Здесь бы найти вообще все конфликты и перебрать вообще все варианты
    let arrResults = findNumbersInCells(arr);
    let globalResults = [];
    for (let indexOfArray = 0; indexOfArray < arr.length; indexOfArray++) {
      let conflict = getConflictNumbers(indexOfArray);
      if (conflict) {
        let conflictedCells = findCells(indexOfArray, conflict);
        console.log('conflictedCells: ', conflictedCells);
        let correctNumber;
        let minSum = 1 * 10 ** 10;
        for (
          let confNumIndex = 0;
          confNumIndex < conflict.length;
          confNumIndex++
        ) {
          let missedNumbers = conflictedCells
            .map(cell => {
              return cell.includes(conflict[confNumIndex])
                ? []
                : Math.min(...cell);
            })
            .flat();
          console.log('missedNumbers: ', missedNumbers);
          let sum = conflict[confNumIndex];
          missedNumbers.forEach(n => (sum += n));
          console.log(
            `Сумма при взятии цифры ${conflict[confNumIndex]}: ${sum}`,
          );
          if (sum < minSum) {
            minSum = sum;
            correctNumber = conflict[confNumIndex];
          }
        }
        globalResults.push(correctNumber);
      }
    }
    return globalResults;
  }

  let results = getNumberInCellWithConflict(arr);

  function reduceArray(arr, num) {
    let newArr = arr.slice();
    let indexesToRemove = newArr.reduce((res, curr, index) => {
      if (curr.includes(num)) res.push(index);
      return res;
    }, []);
    indexesToRemove.forEach((i, index) => newArr.splice(i - index, 1));
    return newArr;
  }

  let reducedArr = arr.slice();

  results.forEach(n => {
    reducedArr = reduceArray(reducedArr, n);
  });

  console.log('reducedArr: ', reducedArr);

  function getResults(arrWithoutConflicts) {
    arrWithoutConflicts.sort();
    let dublicated = arrWithoutConflicts.slice();
    let results = [];

    function countBy(ar) {
      for (let num of ar) {
        if (results.includes(num)) return;
      }
      let temp = ar.map(i => dublicated.flat().filter(num => num == i).length);
      let foundNum = ar[temp.indexOf(Math.max(...temp))];
      results.push(foundNum);
      let indexesToRemove = dublicated.reduce((res, curr, index) => {
        if (curr.includes(foundNum)) res.push(index);
        return res;
      }, []);
      indexesToRemove.forEach((i, index) => dublicated.splice(i - index, 1));
      return;
    }

    arrWithoutConflicts.forEach(item => countBy(item));
    return results;
  }

  let newResults = getResults(reducedArr);
  newResults.forEach(n => results.push(n));
  return results.sort((a, b) => a - b);
}

console.log(
  solve([
    [4, 5],
    [1, 2, 3],
    [4, 5],
    [6, 7, 8],
    [2, 6],
    [7, 9],
  ]),
);
