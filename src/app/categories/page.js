'use client';
import UserTabs from '@/app/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import { useProfile } from '@/app/components/UseProfile';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState('');
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      console.log(response);
      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(creationPromise, {
      loading: 'Creating your new category...',
      success: 'Category created successfully',
      error: 'Error, sorry..',
    });
  }

  if (profileLoading) {
    return 'Loading user info ....';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New category name</label>
            <input
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8">Edit category : </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1"
            >
              <span className="text-gray-500">edit category:</span>
              <span>{c.name}</span>
            </div>
          ))}
      </div>
    </section>
  );
}
