
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


export const mergeSort = async(array, ctx, draw, s=0, e=99, arr=[]) => {
    if (array.length == 100) {
        arr = array.slice();
    }
    if (array.length > 1) {
        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);

        mergeSort(left, ctx, draw, s, mid - 1, arr);
        mergeSort(right, ctx, draw, mid, e, arr);

        let i = 0, j = 0, k = 0;
		
        let r = s;
        draw(ctx, arr);
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            //ctx.fillStyle = "#ff0000";
            arr[r] = array[k];
            ctx.fillRect(ctx.canvas.width * r / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            await new Promise(r => setTimeout(r , 100));
            r++;
            k++;
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            //ctx.fillStyle = "#ff0000";
            arr[r] = array[k];
            ctx.fillRect(ctx.canvas.width * r / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            await new Promise(r => setTimeout(r , 100));
            r++;
            k++;
        }

        while (j < right.length) {
			array[k] = right[j];
			j++;
            //ctx.fillStyle = "#ff0000";
            arr[r] = array[k];
            ctx.fillRect(ctx.canvas.width * r / 100, ctx.canvas.height * (100 - array[k]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
            await new Promise(r => setTimeout(r , 100));
            r++;
            k++;
        }
        // while (r <= e && p <= k) {
        //     arr[r] = array[p];
        //     ctx.fillRect(ctx.canvas.width * r / 100, ctx.canvas.height * (100 - array[p]) / 100, ctx.canvas.width / 100, ctx.canvas.height);
        //     await new Promise(r => setTimeout(r , 100))
        //     r++;
        //     p++;
        // }
        draw(ctx, arr);
    } 
}