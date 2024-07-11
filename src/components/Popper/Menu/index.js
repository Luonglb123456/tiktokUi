import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]); //items chính là mảng MENU_ITEMS
    const current = history[history.length - 1]; //=> BAN ĐẦU CHÍNH LÀ PHẦN TỬ ĐẦU TIÊN data : items
    // lần 2 chạy => current bây giờ chính là phần tử con mới được thêm vào

    const renderItems = () => {
        return current.data.map((item, index) => {
            //current.data => ban đầu chính là mảng items => lọc qua mảng items => return ra item thông qua MenuItem
            //lần 2 chạy current.data thì lại là mảng item.children => lại render ra ngoài
            const isParent = !!item.children; //nếu item trong mảng items có children thì khi click vào

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]); //thêm phần tử con vào mảng => chạy lại hàm
                        } else {
                            onChange(item); //tạm thời xử lý khi click vào menu ko có children thì sao
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[50, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    //khi nhấn onBack thì cắt bỏ phần tử cuối cùng, phần tử kế cuối bây giờ là phần tử cuối cùng được render
                                    setHistory((prev) => prev.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
