import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { FormikConsumer } from 'formik';
import { usePrevious } from './use-previous';

type StringHashMapType = { [key: string]: string };

type Props = {
    name: string;
    values: StringHashMapType;
    // errors: StringHashMapType;
    setValues: (values: StringHashMapType) => void;
    // setErrors: (errors: StringHashMapType) => void;
};

const FormikPersistor = ({ name, values, /* errors, */ setValues /* setErrors */ }: Props) => {
    const [storageKey] = useState(`formik.form.${name}`);

    const prevValues = usePrevious(values);

    // const clear = useCallback(() => {
    //     sessionStorage.removeItem(storageKey);
    // }, [storageKey]);

    // useEffect(() => {
    //     window.addEventListener('beforeunload', clear);
    //     return () => window.removeEventListener('beforeunload', clear);
    // }, [clear]);

    useEffect(() => {
        const data = sessionStorage.getItem(storageKey);

        if (data) {
            const parsed = JSON.parse(data);
            setValues(parsed.values);
            // setErrors(parsed.errors);
        }
    }, [/* setErrors, */ setValues, storageKey]);

    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify({ values /* errors */ }));
    }, [/* errors, */ storageKey, values]);

    return null;
};

export default FormikPersistor;

// class FormikPersistor extends PureComponent<FormikPersistorProps> {
//     // componentWillMount() {
//     //     window.addEventListener('beforeunload', this.clear);
//     // }

//     // componentDidMount() {
//     //     const { setValues, setErrors } = this.props;
//     //     const data = sessionStorage.getItem(this.storageKey);
//     //     if (data) {
//     //         const { values, errors } = JSON.parse(data);
//     //         setValues(values);
//     //         setErrors(errors);
//     //     }
//     // }

//     componentDidUpdate() {
//         const { values, errors } = this.props;
//         sessionStorage.setItem(this.storageKey, JSON.stringify({ values, errors }));
//     }

//     // componentWillUnmount() {
//     //     window.removeEventListener('beforeunload', this.clear);
//     // }

//     // get storageKey() {
//     //     return `formik.form.${this.props.name}`;
//     // }

//     // clear = () => {
//     //     sessionStorage.removeItem(this.storageKey);
//     // };

//     // props: FormikPersistorProps;

//     // render() {
//     //     return null;
//     // }
// }

// const FormikPersist = ({ name }: { name: string }) => (
//     <FormikConsumer>
//         {({ values, errors, setValues, setErrors }) => (
//             <FormikPersistor name={name} setValues={setValues} setErrors={setErrors} values={values} errors={errors} />
//         )}
//     </FormikConsumer>
// );

// export default FormikPersist;
