'use client';
import UserTabs from '@/app/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import { useProfile } from '@/app/components/UseProfile';
import toast from 'react-hot-toast';
import DeleteButton from '@/app/components/DeleteButton';

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState('');
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);

      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editedCategory
        ? 'Category updated'
        : 'Category created successfully',
      error: 'Error, sorry..',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error, sorry...',
    });

    fetchCategories();
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
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update category: ' : 'New category name'}
              {editedCategory && (
                <b className="uppercase">{editedCategory.name}</b>
              )}
            </label>
            <input
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2 flex gap-1">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories: </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
