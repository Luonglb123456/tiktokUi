import { useState, useEffect } from 'react';

//dùng để tối ưu hoá tìm kiếm call api
//tự tạo custom ra cái hook của mình

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handeler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handeler);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounce;
