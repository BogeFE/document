function bubbleSort(array){
    const { length } = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length-1; j++) {
            if(array[j] > array[j+1]){
                [array[j] , array[j+1]] = [array[j+1] , array[j]]; 
            }
        }
    }
    return array;
}

function selectionSort(array){
    const { length } = array;
    let minIndex;
    for (let i = 0; i < length; i++) {
        minIndex = i;
        for (let j = i; j < length; j++) {
            if(array[j] < array[minIndex]){
                minIndex = j;
            }    
        }
        [array[i],array[minIndex]] = [array[minIndex],array[i]]; 
    }
    return array;
}

function insertionSort(array){
    const { length } = array;
    for (let i = 1; i < length; i++) {
        const temp = array[i];
        let j = i;
        while(j>0 && temp < array[j-1]){
            array[j] = array[j-1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}

function mergeSort(array){
    const merge = (left,right)=>{
        let i = 0,j = 0;
        const result = [];
        while(i<left.length && j<right.length){
            result.push(left[i]<right[j] ? left[i++] : right[j++]);
        }
        return result.concat(i===left.length ? right.slice(j) : left.slice(i));
    }

    if(array.length > 1){
        const { length } = array;
        const middle = Math.floor(length/2);
        const left = mergeSort(array.slice(0,middle));
        const right = mergeSort(array.slice(middle));
        array = merge(left,right);
    }
    return array;
}

function quickSort(array){
    return quick(array,0,array.length-1);
}
function quick(array,left,right){
    if(array.length>1){
        const index = partition(array,left,right);
        if(left < index-1){
            quick(array,left,index-1);
        }
        if(right > index){
            quick(array,index,right);
        }
    }
    return array;
}
function partition(array,left,right){
    const pivot = array[Math.floor((left+right)/2)];
    let i = left;
    let j = right;
    while(i <= j){
        while(array[i] < pivot){
            i++;
        }
        while(array[j] > pivot){
            j--;
        }
        if(i<=j){
            [array[i],array[j]] = [array[j],array[i]];
            i++;
            j--;
        }
    }
    return i
}

function countSort(array){
    if(array.length < 2){
        return array;
    }
    let counts = [];
    array.forEach(element => {
        if(!counts[element]){
            counts[element] = 0;
        }
        counts[element]++;
    });
    array = [];
    counts.forEach((count,i)=>{
        while(count>0){
            array.push(i);
            count--;
        }
    });
    return array;
}
