import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

const handlePreview = (props) => (
    <div tabIndex="-1" {...props}>
        <PopperWrapper>
            <AccountPreview />
        </PopperWrapper>
    </div>
);
function AccountItem() {
    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={handlePreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        alt=""
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/c83e03254069e26a52f8e9560435c3f9.jpeg?lk3s=a5d48078&nonce=47952&refresh_token=39908de7d2b53cae7eb19056aaf933d8&x-expires=1721116800&x-signature=sPupW98ykEZxA9XuX9BkWyMmDBc%3D&shp=a5d48078&shcp=81f88b70"
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>thaibinhnavie</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Thái Bình Trần</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}
export default AccountItem;
