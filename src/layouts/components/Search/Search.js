import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome//free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import styles from './Search,module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowReasult] = useState(false);
    //ta để showResult là true ban đầu vì muốn hiển thị search phải đủ 2 điều kiện, ở đây true thì vân chưa đủ
    const [loading, setLoading] = useState(false); // loading ban đầu là false

    const inputRef = useRef();

    //1: ''
    //2: 'h'
    //3: 'ho'
    const debouncedValue = useDebounce(searchValue, 500);
    //vì searchValue thay đổi liên tục nên call api liên tục nên phải debounce search value => deps trong useEffect thay đổi
    //chỉ nhận value sau khi ngưng gõ 500ms

    useEffect(() => {
        if (!debouncedValue.trim()) {
            //nếu searchValue ko có giá trị thì ko chạy hàm
            //.trim() để loại bỏ dấu cách khi lần đầu tiên nhập
            setSearchResult([]); //khi ô tìm kiếm không có gì thì result là mảng rỗng => không hiện
            return;
        }

        const fetchApi = async () => {
            setLoading(true); //trước khi gọi API loading là true

            const resutl = await searchServices.search(debouncedValue);

            setSearchResult(resutl);
            setLoading(false);
        };

        fetchApi();

        // request
        //     .get('users/search', {
        //         params: {
        //             q: debouncedValue,
        //             type: 'less',
        //         },
        //     })
        //     .then((res) => {
        //         setSearchResult(res.data); //lấy dc data api thì set vào mảng để hiển thị ra
        //         setLoading(false); //gọi API xong thif loading là false
        //     })
        //     .catch(() => {
        //         //gọi api ko được thì cũng set loading vê false ko hiện nữa
        //         setLoading(false);
        //     });
    }, [debouncedValue]);

    const handleHideResult = () => {
        //hàm xử lý khi click ra ngoài
        setShowReasult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowReasult(true)} //khi focus vào lại ô input thì lại hiện tippy
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
