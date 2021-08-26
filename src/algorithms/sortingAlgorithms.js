export function* bubbleSort (array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
            yield j;
        }
    }  
};

export function* selectionSort (array) {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i; j < array.length; j++) {
            if (array[j] < array[min]) min = j;
            yield j;
        }
        [array[i], array[min]] = [array[min], array[i]];
    }
}

export function* insertionSort (array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            for (let j = i; j >= 0; j--) {
                if (array[j] < array[j - 1]) {
                    [array[j - 1], array[j]] = [array[j], array[j - 1]];
                }
                yield j;
            }
        }
    }
}


export function* mergeSort (array, start=0, end=200) {
    if (end - start > 1) {
        const mid = Math.floor((end + start) / 2);
        yield * mergeSort(array,  mid, end);
        yield * mergeSort(array,  start, mid);

        const left = array.slice(start, mid);
        const right = array.slice(mid, end);

        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k] = left[i];
                i++;
                yield i;
            } else {
                array[k] = right[j];
                j++;
                yield j;
            }
            k++;
            yield k;
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            k++;
            yield i;
            yield k;
        }
        
        while (j < right.length) {
			array[k] = right[j];
			j++;
            k++;
            yield j;
            yield k;
        }
    } 
}

function* partition (array, start, end) {
    let pivotIndex = start;
    let pivot = array[pivotIndex];
  
    while (start < end) {
        while (start < array.length && array[start] <= pivot) {
            start++;
            yield start;
        }
        while (array[end] > pivot) {
            end--;
            yield end;
        }
        if (start < end) {
            [array[start], array[end]] = [array[end], array[start]];
        }
        
    }

    [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];
    return end;
  }
  
export function* quickSort (array, start=0, end=199) {
    if (start < end) {
        let p = yield * partition(array, start, end);
        yield * quickSort(array, start, p - 1);
        yield * quickSort(array, p + 1, end);
    }
}