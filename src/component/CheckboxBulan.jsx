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
  const [Bulan, setBulan] = useState([
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]);

  const handle = (index) => {
    const data = [...Bulan];
    if (data[index].includes("-")) {
      data[index] = data[index].replace("-", "");
    } else {
      data[index] = "-" + data[index];
    }
    setBulan(data);
    props.fungsi(Bulan);
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
        Jumlah Bulanan Pembayaran {props.jenis} *
      </FormLabel>
      <br />

      <TextField
        id={"input " + props.jenis}
        name={props.jenis}
        required
        focused
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="standard"
        fullWidth={true}
        size="small"
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(0)} />
        }
        label={"Januari"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(1)} />
        }
        label={"Februari"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(2)} />
        }
        label={"Maret"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(3)} />
        }
        label={"April"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(4)} />
        }
        label={"Mei"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(5)} />
        }
        label={"Juni"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(6)} />
        }
        label={"Juli"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(7)} />
        }
        label={"Agustus"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(8)} />
        }
        label={"September"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(9)} />
        }
        label={"Oktober"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(10)} />
        }
        label={"November"}
      />
      <FormControlLabel
        control={
          <Checkbox size="small" defaultChecked onChange={() => handle(11)} />
        }
        label={"Desember"}
      />
    </Box>
  );
};

export default CheckboxBulan;
