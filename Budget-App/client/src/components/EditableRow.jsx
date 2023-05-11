import {useState} from 'react'
import { CheckIcon } from '@heroicons/react/20/solid';
const EditableRow = ({ item, editFormData, handleEditDoneClick, handleEditFormChange }) => {
    
    return(
        <tr key={item.id} className="text-left">
           <td className="border-b flex">
                <CheckIcon className="w-7 h-7 mt-1.5 ml-1 text-green" onClick={(event)=>handleEditDoneClick(event, item)}/>
                <input className="placeholder-gray-300" type="text" required name="itemName" onChange={handleEditFormChange} value={editFormData.itemName} placeholder="Name*"/>
                <input className="placeholder-gray-300 md:w-auto" type="text" name="itemLink" onChange={handleEditFormChange} value={editFormData.itemLink} placeholder="Link"/>
            </td>
            <td className="border">
            <input
                id="itemPrice"
                name="itemPrice"
                type="text"
                autoComplete="itemPrice"
                required
                placeholder="$*"
                pattern="^\d+(\.\d{1,2})?$"
                className="placeholder-gray-300 w-20 md:w-28"
                value={editFormData.itemPrice}
                onChange={(event) => {
                    const input = event.target.value;
                    const regex = /^[0-9]*(?:\.[0-9]{0,2})?$/;
                    if (regex.test(input)) {
                        handleEditFormChange(event)
                    }
                }}
            />
                {/* <input  className="placeholder-gray-300" type="number" min=".01" step=".01" required name="itemPrice" value={editFormData.itemPrice} onChange={handleEditFormChange}  placeholder="$*"/> */}
            </td>
            <td className="border">
                <input className="placeholder-gray-300 md:w-28 text-center" type="number" min="1" required name="itemQuantity" onChange={handleEditFormChange} value={editFormData.itemQuantity} placeholder="#*"/>
            </td>

            <td className="border">
                {/* <input className="placeholder-gray-300 md:w-28" type="number" min="1" required name="itemPriority" onChange={handleEditFormChange} value={editFormData.itemPriority} placeholder="Priority*"/>  */}
                <select value={editFormData.itemPriority} className="md:w-auto" required name="itemPriority" onChange={handleEditFormChange}>
                    <option value="5">Urgent</option>
                    <option value="4">High</option>
                    <option value="3">Medium</option>
                    <option value="2">Low</option>
                    <option value="1">No Priority</option>
                </select>
            </td>
        </tr>
    )
}


export default EditableRow;