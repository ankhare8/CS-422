import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon, LinkIcon } from '@heroicons/react/20/solid'


export default function PreviewModal (props) {
  return (
    <Transition appear show={props.listModalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.handleModalClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-4xl my-10 overflow-x-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={props.handleModalClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div className="py-6 px-4 list-header font-bold leading-6 text-gray-500">
                  <div>
                    <div className="text-sm font-light text-gray-300"> Quick View </div>
                    <div className="text-xl font-bold">{props.list.name}</div>
                </div>
                  <PencilSquareIcon className="w-6 h-6 text-gray-200 ml-2 mb-1 mr-auto" onClick={()=> props.handleListEditClick(props.list)}/>
                </div>
                <table className="border-collapse w-full overflow-scroll table-auto text-gray-500">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 font-bold w-full">Name</th>
                      {/* <th className="text-left p-3 font-bold">Link</th> */}
                      <th className="text-left p-3 font-bold">Price</th>
                      <th className="text-left p-3 font-bold">Quantity</th>
                      <th className="text-left p-3 font-bold">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.list.items && (props.list.items.map((item) => (
                      <tr key={item.id} className="bg-white border-b">
                        { item.link.length > 0 ? (
                          <td className="p-3"><a href={item.link}>{item.name}</a></td>
                        ) : (
                          <td className="p-3">{item.name}</td>
                        )} 
                          <td className="p-3">${item.price}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 priority" data-priority={item.priority}></td>
                      </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

