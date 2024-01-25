'use client';
import EditableImage from '@/app/components/layout/EditableImage';
import { useState } from 'react';
import { useProfile } from '../UseProfile';
import AddressInputs from './AddressInputs';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const [email, setEmail] = useState(user?.email || '');
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'city') setCity(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'country') setCountry(value);
    if (propName === 'phone') setPhone(value);
  }

  return (
    <div className="flex gap-4">
      <div>
        <div className=" p-2 rounded-lg relative max-w-[120px] ">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>First and Last name</label>
        <input
          type="text"
          placeholder="First and last name "
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={email}
          placeholder={'email'}
        />
        <AddressInputs
          addressProp={{
            phone,
            streetAddress,
            city,
            postalCode,
            country,
          }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value={1}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
