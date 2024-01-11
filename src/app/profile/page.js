'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfoBox from './../components/layout/InfoBox';
import SuccessBox from './../components/layout/SuccessBox';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const { status } = session;
  //console.log(session);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, image }),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      toast('Uploading....');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        toast.success('Upload complete!');
      } else {
        toast.error('Cannot Upload!');
      }
      const link = await response.json();
      setImage(link);
    }
  }

  if (status === 'loading') {
    return 'loading...';
  }
  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <section className="mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4 ">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 item-center ">
          <div>
            <div className=" p-2 rounded-lg relative max-w-[xs] ">
              <div className="relative h-24">
                {image && (
                  <Image
                    className="rounded-lg w-full h-full mb-1 object-contain"
                    src={image}
                    width={250}
                    height={250}
                    alt={'avatar'}
                  />
                )}

                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                    Edit
                  </span>
                </label>
              </div>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and last name "
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
