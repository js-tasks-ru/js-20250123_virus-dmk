/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return function(obj){
        let pathArr = path.split(".");
        let pathLen = pathArr.length;
        
        if (pathLen === 0 ) return undefined;

        let tempObjProp = obj;

        for (let i=0; i < pathLen; i++){
            if (tempObjProp.hasOwnProperty(pathArr[i])) {
                tempObjProp = tempObjProp[pathArr[i]];
            } else { 
                return undefined; 
            }
        }

        return tempObjProp;
    }
}
