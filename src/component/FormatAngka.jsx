import { NumericFormat } from "react-number-format";
import React from "react";
import PropTypes from "prop-types";
const FormatAngka = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={"."}
      decimalSeparator={","}
      valueIsNumericString
      prefix="Rp."
    />
  );
});
FormatAngka.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default FormatAngka;
