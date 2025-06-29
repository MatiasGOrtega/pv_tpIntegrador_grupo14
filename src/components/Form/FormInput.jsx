import { memo } from 'react';
import { Box, TextArea, TextField } from '@radix-ui/themes';
const FormInput = memo(({ label, name, value, onChange, type = 'text', disabled = false, required = true, placeholder }) => {
  return (
    <Box mb="2">
      {
        type === "text" || type === "number" || type === "url" || type === "email" || type === "password" ? (
          <>
            <label htmlFor={name}>{label}</label>
            <TextField.Root
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
            />
          </>
        ) : (
          <TextArea
            label={label}
            resize="none"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder} />
        )
      }

    </Box>
  );
});

export default FormInput;