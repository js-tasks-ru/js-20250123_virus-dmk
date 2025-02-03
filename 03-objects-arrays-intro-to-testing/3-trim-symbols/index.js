/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === undefined) return string;
    if (size === 0 || string === "") return "";

    let arrFromStr = string.split("");
    let newArr = [];
    let tempCount = 0; 
    
    for (let i = 0; i < arrFromStr.length; i++){
        if (i === 0) {
            newArr.push(arrFromStr[i]);
            tempCount = 1;
            continue;
        }
        if ( arrFromStr[i] != arrFromStr[i-1]) {
            newArr.push(arrFromStr[i])
            tempCount = 1;
        }

        if (arrFromStr[i] === arrFromStr[i-1] && tempCount < size) {
            newArr.push(arrFromStr[i]);
            tempCount++;
        } 
    }

    return newArr.join("");
    
}
