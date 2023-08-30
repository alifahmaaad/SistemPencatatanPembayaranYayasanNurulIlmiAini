import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
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

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CheckboxBulan = (props) => {
  const [Bulan, setBulan] = useState(props.bulan);
  const [val, setVal] = useState(0);
  if (props.do) {
    useEffect(() => {
      setBulan(props.bulan);
      console.log(props.bulan);
    }, [props.bulan]);
  }
  const handle = (index) => {
    const data = [...Bulan];
    if (data[index].includes("-")) {
      data[index] = data[index].replace("-", "");
    } else {
      data[index] = "-" + data[index];
    }
    const databulan = [...data];
    setBulan(databulan);
    props.fungsi(databulan);
  };
  return (
    <Box>
      <br />
      <FormLabel
        sx={{
          color: "#53c79e !important",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        Jumlah Bulanan Pembayaran {props.jenis}
        {props.required == false ? null : "*"}
      </FormLabel>
      <br />
      <TextField
        id={"input " + props.jenis}
        name={props.jenis}
        required={props.required == false ? false : true}
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="standard"
        fullWidth={true}
        size="small"
        onChange={(e) => setVal(e.target.value)}
      />
      {props.bulan.map((item, i) => (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              size="small"
              defaultChecked={props.qurban == false ? false : true}
              onChange={() => handle(i)}
              disabled={val == 0 || val == "" ? true : false}
            />
          }
          label={item}
        />
      ))}
    </Box>
  );
};

export default CheckboxBulan;
