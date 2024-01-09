'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const session = useSession();
  console.log(session);
  const { status } = session;

  if (status === 'loading') {
    return 'loading...';
  }
  if (status === 'unauthenticated') {
    redirect('/login');
  }

  const userImage = session.data.user.image;
  return (
    <section className="mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4 ">Profile</h1>
      <form className="max-w-md mx-auto ">
        <div className="flex gap-4 item-center ">
          <div>
            <div className=" p-2 rounded-lg relative ">
              <div className="relative h-24">
                <Image
                  className="rounded-lg w-full h-full mb-1 object-contain"
                  src={userImage}
                  width={250}
                  height={250}
                  alt={'avatar'}
                />{' '}
                <button type="button">Edit</button>
              </div>
            </div>
          </div>
          <div className="grow">
            <input type="text" placeholder="First and last name " />
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
