import { memo } from 'react';
import { Flex } from '@radix-ui/themes';
const FormInputSelect = memo(({ label, name, value, onChange, required = true }) => {
  return (
    <Flex mb="5" direction="column">
      <label htmlFor={name}>{label}</label>
      <select
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>Seleccione una categoría</option>
        <option value="electronics">Electrónica</option>
        <option value="jewelery">Joyería</option>
        <option value="men's clothing">Ropa de Hombre</option>
        <option value="women's clothing">Ropa de Mujer</option>
      </select>
    </Flex>
  );
});

export default FormInputSelect;