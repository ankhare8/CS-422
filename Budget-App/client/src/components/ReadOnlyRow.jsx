// import EditPopover from "./EditPopover";
import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from"@heroicons/react/20/solid";
import PencilIcon from '@heroicons/react/20/solid';
import TrashIcon from '@heroicons/react/20/solid';
const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    // console.log('handleEditClick: ', handleEditClick);
    // console.log('handleDeleteClick: ', handleDeleteClick);

    return(
        <tr key={item} className=" border-b text-left ">
            <td className="pl-1 sm:p-3 p-1 flex">
                {/* <EditPopover 
                    item={item}
                    handleEditClick={handleEditClick} 
                    handleDeleteClick={handleDeleteClick}
                /> */}
                <div className="text-center flex gap-2 pr-2 items-center ">
                    <div
                    className="hover:bg-purple-300 cursor-pointer"
                    onClick={()=>{handleDeleteClick(item)}}
                    >
                        🗑
                    </div>
                    <div
                    className="hover:bg-purple-300 cursor-pointer"
                    onClick={()=>{handleEditClick(item)}}
                    >
                        ✏️
                    </div>
                </div>
                {item.link ? <a href={item.link} target="_blank">{item.name}</a> : item.name}
            </td>
            <td className="sm:p-3 p-1">${item.price}</td>
            <td className="sm:p-3 p-1 text-center">{item.quantity}</td>
            <td className="sm:p-3 p-1 priority" data-priority={item.priority}></td>
        </tr>
    )
}

export default ReadOnlyRow;