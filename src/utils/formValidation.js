export const formValidation = (value) => {
    const errors = {};

    if (!value.name) errors.name = 'filed is required';
    if (!value.text) errors.text = 'filed is required';

    return errors;
};