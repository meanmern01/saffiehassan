import styles from './AppMessage.module.scss';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
    /**
     * HTML slot where action controls are rendered
     */
    actionsSlot?: ReactNode;
    /**
     * Whether component is fixed and appears on the top left of a screen
     */
    fixed?: boolean;
    /**
     * Additional text
     */
    text?: string | ReactNode;
    /**
     * Whether component is visible on a screen
     */
    visible?: boolean;
};

const AppMessage = ({ fixed = false, visible = true, actionsSlot, text, children, ...props }: Props) => {
    const [isStatic] = useState(visible);

    return (
        <CSSTransition in={visible} mountOnEnter unmountOnExit timeout={1550} classNames="curtain">
            <div
                {...props}
                className={classNames('app-message', styles.container, props.className, {
                    [styles.static]: isStatic,
                    [styles.fixed]: fixed,
                    // [styles.visible]: visible,
                })}
            >
                <div className={classNames('app-message__top', styles.top)}>{children}</div>
                {text && (
                    <div className={classNames('app-message__text', styles.text)}>
                        {typeof text === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: text }}></div>
                        ) : (
                            <div>{text}</div>
                        )}
                    </div>
                )}
                {actionsSlot && <div className={classNames('app-message__bottom', styles.bottom)}>{actionsSlot}</div>}
            </div>
        </CSSTransition>
    );
};

export default AppMessage;
