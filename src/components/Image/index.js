import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(customFallback);
    };

    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
//TH src ko lỗi => fallback ko có dữ liệu => lấy src
//TH src lỗi => chạy hàm handleError => setFallback => fallback có giá  trị => ưu tiên lấy fallback bỏ qua src bị lỗi
//TH Image nằm ơ r vị trí khác và muốn lấy hình khác làm mặc định, truyền vào link của hình prop là fallback
//khi ko có fallback thì mặc định là no-Image, còn khi có fallback thì là link fallbacks
