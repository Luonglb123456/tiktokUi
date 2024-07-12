import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    disable = false,
    text = false,
    primary = false,
    outline = false,
    small = false,
    large = false,
    rounded = false,
    className,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    //thẻ button có thể chuyển sang 1 trang khác khi onClick
    //nhận vào to: chuyển trang nội bộ
    //href chuyển trang khác
    //mặc định ban đầu là thẻ Button = let

    //...passProps là những props khác có thể dc truyền vào vd: target:'_blank' chuyển trang trong tab mới
    let Comp = 'button';
    const props = {
        //tất cả những props mà thẻ button có thể nhận vào
        onClick,
        ...passProps,
    };

    //Remove event listener when btn is disable
    // Object.keys(props).forEach((key) => {
    //     if (key.startsWith('on') && typeof props[key] === 'function') {
    //         delete props[key];
    //     }
    // });

    if (disable) {
        delete props.onClick;
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

//children sau này có thể xử lý việc có thêm các icon trước hoặc sau

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};
export default Button;
