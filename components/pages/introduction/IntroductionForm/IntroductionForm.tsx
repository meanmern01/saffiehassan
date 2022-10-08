import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Input from '@/components/shared/Input';

type Props = {
    label: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    onFormSubmit?: () => void;
};

const IntroductionForm = ({ label, inputValue, setInputValue, onFormSubmit }: Props) => {
    const [focused, setFocused] = useState(false);

    function submitForm(event: FormEvent<HTMLElement>) {
        event.preventDefault();
        onFormSubmit?.();
    }

    return (
        <div className="testing-introduction" style={{ '--introduction-form-label-symbols': `${label.length}` }}>
            <div className="text-caption testing-introduction__label js-introduction-form-label">
                {focused || inputValue.trim().length > 0 ? label : 'Click to type'}
            </div>
            <form onSubmit={submitForm} className="js-introduction-form">
                <Input
                    id="introduction-form__input"
                    containerProps={{ className: 'testing-introduction__input' }}
                    label={label}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </form>
        </div>
    );
};

export default IntroductionForm;
