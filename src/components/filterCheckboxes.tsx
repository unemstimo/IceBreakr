import React, { useState } from 'react';

function Checkboxes() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="flex flex-col">
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Kortspill"
          checked={checkedItems.Kortspill || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Kortspill</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Ballspill"
          checked={checkedItems.Ballspill || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Ballspill</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Navneleker"
          checked={checkedItems.Navneleker || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Navneleker</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Brettspill"
          checked={checkedItems.Brettspill || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Brettspill</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Huskeleker"
          checked={checkedItems.Huskeleker || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Huskeleker</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Drikkeleker"
          checked={checkedItems.Drikkeleker || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Drikkeleker</span>
      </label>
      <label className="inline-flex items-center mt-1 ml-2">
        <input
          type="checkbox"
          name="Fysisklek"
          checked={checkedItems.Fysisklek || false}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-gray-600 bg-neutral-600 border-gray-400 rounded mr-1"
        />
        <span className="ml-2">Fysisk lek</span>
      </label>
    </div>
  );
}

export default Checkboxes;
