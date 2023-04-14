import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from"@heroicons/react/20/solid";

export default function EditPopover() {
  const [menuOpen, setMenuOpen] = useState(false); // Add state variable and setter function

  return (
    <Popover onBlur={() => {
      setMenuOpen(false);
    }}>
      {({ open }) => (
        <>
          <Popover.Button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center focus:outline-none"
          >
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Popover.Button>
          <Transition
            show={menuOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              static
              className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Delete
                </a>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
