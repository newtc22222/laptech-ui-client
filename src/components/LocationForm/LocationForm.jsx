/** @format */

import useLocationForm from './useLocationForm';
import Select from 'react-select';

const customStyles = {
  control: (base) => ({
    ...base,
    height: 54.81,
    minHeight: 54.81,
    // width: '613px',
    // minWidth: '613px',
  }),
};

function LocationForm({ onChange, disabled }) {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);

  const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

  return (
    <div className="form-container my-8 w-full">
      <div className="select-container flex">
        <Select
          name="cityId"
          key={`cityId_${selectedCity?.value}`}
          isDisabled={cityOptions.length === 0 || disabled}
          options={cityOptions}
          onChange={(option) => onCitySelect(option)}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
          styles={customStyles}
          required
          disabled={disabled}
        />

        <Select
          name="districtId"
          key={`districtId_${selectedDistrict?.value}`}
          isDisabled={districtOptions.length === 0 || disabled}
          options={districtOptions}
          onChange={(option) => onDistrictSelect(option)}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
          styles={customStyles}
          required
          disabled={disabled}
        />

        <Select
          name="wardId"
          key={`wardId_${selectedWard?.value}`}
          isDisabled={wardOptions.length === 0 || disabled}
          options={wardOptions}
          placeholder="Phường/Xã"
          onChange={(option) => {
            onWardSelect(option);
            onChange({ ward: option.label, district: selectedDistrict.label, city: selectedCity.label });
          }}
          defaultValue={selectedWard}
          styles={customStyles}
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default LocationForm;
