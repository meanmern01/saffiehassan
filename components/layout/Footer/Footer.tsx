import classNames from 'classnames';
import styles from './Footer.module.scss';

const Footer = ({ ...props }) => {
    return <footer className={classNames('footer wrapper js-footer', styles.footer, props.className)}>footer</footer>;
};

export default Footer;
