'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/SectionHeaders';
import MenuItem from '../components/menu/MenuItem';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);
  console.log(menuItems);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c, index) => (
          <div key={index}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((m) => m.category === c._id)
                .map((item, index) => (
                  <MenuItem key={index} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
