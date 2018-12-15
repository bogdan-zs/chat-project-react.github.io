export const asyncEach = (array, func) => {
    const INTERVAL = 10;
    const end = array.length - 1;
    let i = 0;
    let time = Date.now();

    const next = () => {
        while (i <= end) {
            const now = Date.now();
            const diff = now - time;

            if (diff > INTERVAL) {
                time = now;
                setTimeout(next, 0);
                break;
            } else {
                func(array[i], i++, array);
            }
        }
    };

    next();
};
