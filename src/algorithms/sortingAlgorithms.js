export const bubbleSort = async (array, ctx, draw) => {
    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {
            draw(ctx, array);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ctx.canvas.width * j / 100, ctx.canvas.height * (100 - array[j]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
            await new Promise(r => setTimeout(r, 1));
        }

    }  
    draw(ctx, array);  
};

export const selectionSort = async (array, ctx, draw) => {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i; j < array.length; j++) {
            draw(ctx, array);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ctx.canvas.width * j / 100, ctx.canvas.height * (100 - array[j]) / 100, ctx.canvas.width / 100, ctx.canvas.height);

            if (array[j] < array[min]) min = j;

            await new Promise(r => setTimeout(r, 1));
        }
        [array[i], array[min]] = [array[min], array[i]];
    }
    draw(ctx, array);
}

export const insertionSort = async (array, ctx, draw) => {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            for (let j = i; j >= 0; j--) {
                draw(ctx, array);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(ctx.canvas.width * j / 100, ctx.canvas.height * (100 - array[j]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
                if (array[j] < array[j - 1]) {
                    [array[j - 1], array[j]] = [array[j], array[j - 1]];
                }
                await new Promise(r => setTimeout(r , 1))
            }
        }
    }
    draw(ctx, array);
}


export const mergeSort = async(array, ctx, draw, start=0, end=100) => {
    if (end - start > 1) {
        const mid = Math.floor((end + start) / 2);
        
        mergeSort(array, ctx, draw, start, mid);
        mergeSort(array, ctx, draw, mid, end);

        const left = array.slice(start, mid);
        const right = array.slice(mid, end);

        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            //ctx.fillRect(ctx.canvas.width * k / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            k++;
            //await new Promise(q => setTimeout(q , 10));
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            //ctx.fillRect(ctx.canvas.width * k / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            k++;
            //await new Promise(q => setTimeout(q , 1));
        }

        while (j < right.length) {
			array[k] = right[j];
			j++;
            // ctx.fillRect(ctx.canvas.width * k / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            // await new Promise(q => setTimeout(q , 1));
            k++;
        }
        draw(ctx, array);
    } 
    console.log(array)
}

const partition = (array, ctx, draw, start, end) => {
    let pivotIndex = start;
    let pivot = array[pivotIndex];
  
    while (start < end) {
        while (start < array.length && array[start] <= pivot) {
            start++;
        }
        while (array[end] > pivot) {
            end--;
        }
        if (start < end) {
            [array[start], array[end]] = [array[end], array[start]];
        }
        
    }

    [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];
    return end;
  }
  
export const quickSort = async (array, ctx, draw, start=0, end=99) => {
    if (start < end) {
        let p = partition(array, ctx, draw, start, end);
        console.log(array)
        draw(ctx, array);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(ctx.canvas.width * start / 100, ctx.canvas.height * (100 - array[start]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
        ctx.fillRect(ctx.canvas.width * end / 100, ctx.canvas.height * (100 - array[end]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
        await new Promise(r => setTimeout(r, 150));

        quickSort(array, ctx, draw, start, p - 1);
        quickSort(array, ctx, draw, p + 1, end);
    }
    draw(ctx, array)
}