import { Fragment, useState } from "react";
import {nanoid} from 'nanoid';
import { Transition } from "@headlessui/react";
import { PlusIcon, BarsArrowUpIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import EditPopover from "./EditPopover";

export default function Edit (props) {
  const [showAdd, setShowAdd] = useState(false)
  const [items, setItems] = useState(props.list.items);
  const [addFormData, setAddFormData] = useState({
    itemName:'',
    itemLink: '',
    itemPrice:'',
    itemQuantity:'',
    itemPriority: 'Medium',
  })

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData}
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    
    const name = addFormData.itemName;
    const priority =  addFormData.itemPriority;
    const quantity = addFormData.itemQuantity;
    const price = addFormData.itemPrice;
    const link = addFormData.itemLink;

    if (!name || !priority || !quantity || !price){
      console.log(addFormData);
      window.alert("Please fill out all of the required fields")
    } else {
      const newItem = {
        itemID: nanoid(),
        "name": name,
        "priority": priority,
        "quantity": quantity,
        "price": price,
        "link": link,
      }
      const newList = [...items, newItem]
      setItems(newList);
    }
  }

  return (
    // <div className="text-xl font-bold">{props.list.name}</div>
    <Transition
      show={props.showEdit}
      enter="transition-transform transition-opacity ease-out duration-500"
      enterFrom="opacity-0 translate-w-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition-transform transition-opacity ease-in duration-500"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-w-full"
    >
            <div className="transition-all transform h-full">
              <div>
                <div className="py-6 px-4 list-header w-100 font-bold leading-6 text-gray-500">
                <button
                    className="mt-4 py-2 px-4 text-white rounded-md hover:bg-indigo-600"
                    onClick={props.handleEditClose}
                  >
                    	&larr; Back
                  </button>
                    <div className="mx-auto text-center">
                      <div className="text-sm font-light text-gray-300"> Edit View </div>
                      <div className="text-xl font-bold">{props.list.name}</div>
                  </div>
                  <button
                    type="submit"
                    className="group relative flex justify-center rounded-md py-2 px-3 border text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save List
                  </button>
                  
                </div>
                <table className="border-collapse w-full overflow-scroll table-auto text-gray-500">
                    <thead>
                        <tr className="bg-gray-50 border-b text-left">
                        <th className="p-3 font-bold w-full">Name</th>
                        {/* <th className="text-left p-3 font-bold text-gray-600">Link</th> */}
                        <th className=" p-3 font-bold">Price</th>
                        <th className="p-3 font-bold">Quantity</th>
                        <th className="p-3 font-bold flex">Priority <BarsArrowUpIcon className="ml-1 mt-1 w-5 h-5"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.list.items && (items.map((item) => (
                        <tr key={item.id} className=" border-b text-left">
                            <td className="pl-1 sm:p-3 p-1 flex"><EditPopover/>{item.link ? <a href={item.link} target="_blank">{item.name}</a> : item.name}</td>
                            <td className="sm:p-3 p-1">${item.price}</td>
                            <td className="sm:p-3 p-1">{item.quantity}</td>
                            <td className="sm:p-3 p-1">{item.priority}</td>
                        </tr>
                        )))}
                        {/* {
                          showAdd && ( */}
                            <tr className="">
                              <td className="border-b flex">
                                <PlusIcon className="w-7 h-7 mt-1.5 ml-1" onClick={handleAddFormSubmit}/>
                                <input className="placeholder-gray-300" type="text" required name="itemName" onChange={handleAddFormChange} placeholder="Name*"/>
                                <input className="placeholder-gray-300 md:w-auto" type="text" name="itemLink" onChange={handleAddFormChange} placeholder="Link"/>
                              </td>
                              <td className="border">
                                <input  className="placeholder-gray-300" type="number" min=".01" step=".01" required name="itemPrice" onChange={handleAddFormChange}  placeholder="Price*"/>
                              </td>
                              <td className="border">
                                <input className="placeholder-gray-300 md:w-28" type="number" min="1" required name="itemQuantity" onChange={handleAddFormChange} placeholder="Quantity*"/>
                              </td>
                              <td className="border">
                                <select className="md:w-auto" required name="itemPriority" onChange={handleAddFormChange}>
                                  <option value="High">High</option>
                                  <option selected value="Medium">Medium</option>
                                  <option value="Low">Low</option>
                                </select>
                              </td>
                            </tr>
                          {/* )
                        }
                        <tr className="new border-b" onClick={()=>setShowAdd(!showAdd)}>
                          <td className="flex p-3"><PlusIcon className="w-5 h-5 mr-2"/>New</td>
                        </tr> */}
                    </tbody>
                    </table>
              </div>
            </div>
    </Transition>
  );
}

