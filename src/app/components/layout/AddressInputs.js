export default function AddressInputs({
  addressProp,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, city, postalCode, country } = addressProp;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(ev) => setAddressProp('phone', ev.target.value)}
      />
      <label>Street Adress</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
          />
        </div>
      </div>

      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
      />
    </>
  );
}
