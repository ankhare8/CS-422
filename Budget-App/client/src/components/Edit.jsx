import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { PlusIcon, CheckIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {nanoid} from 'nanoid';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config/apiUrl";
import { toast } from 'react-toastify';
import * as cheerio from 'cheerio';

export default function Edit (props) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState(props.list.items);
  const [addFormData, setAddFormData] = useState({
    itemName:'',
    itemLink: '',
    itemPrice:'',
    itemQuantity:'1',
    itemPriority: '3',
  })

  const [editItemId, setEditItemId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    itemName:'',
    itemLink: '',
    itemPrice:'',
    itemQuantity:'',
    itemPriority: ''
  })

  const [nameEdit, setNameEdit] = useState(false)
  const [name, setName] = useState(props.list.name);
  const [error, setError] = useState('');
  const [validLink, setValidLink] = useState('');

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData}
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {    
    const name = addFormData.itemName;
    const priority =  addFormData.itemPriority;
    const quantity = addFormData.itemQuantity;
    const price = addFormData.itemPrice;
    const link = addFormData.itemLink;

    if (!name || !priority || !quantity || !price){
      toast.error("Add all required fields", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      const newItem = {
        "id": nanoid(),
        "name": name,
        "priority": priority,
        "quantity": quantity,
        "price": price,
        "link": link,
      }
      const newList = [...items, newItem]
      setItems(newList);

      setAddFormData({
        itemName:'',
        itemLink: '',
        itemPrice:'',
        itemQuantity:'1',
        itemPriority: '3',
      })
    }
  }

  const handleEditClick = (item) => {
    // event.preventDefault();
    console.log("edit item id: " + item.id)
    setEditItemId(item.id);
    const currItem = {
      itemName: item.name,
      itemLink: item.link,
      itemPrice: item.price,
      itemQuantity: item.quantity,
      itemPriority: item.priority,
    }

    setEditFormData(currItem)
  } 

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData}
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData)
  }

  const handleEditDoneClick = (event, item) => {
    event.preventDefault();
    let keys1 = ['name', 'priority', 'quantity', 'price', 'link'];
    let keys2 = ['itemName', 'itemPriority', 'itemQuantity', 'itemPrice', 'itemLink']

    for(let key of keys2){
      if (!editFormData[key] && key != 'itemLink'){
        console.log(addFormData);
        window.alert("Please fill out all of the required fields")
        return;
      }
    }

    let edited = false;

    for(let i = 0; i < keys1.length; i++){
      if (editFormData[keys2[i]] !== item[keys1[i]]){
        edited = true;
      }
    }

    let newItem = {
      id: item.id
    };

    if(edited){
      for(let i = 0; i < keys1.length; i++){
          newItem[keys1[i]] = editFormData[keys2[i]];
      }

      const newItems = [...items]

      const index = items.findIndex((item)=>{
        return item.id === editItemId
      })

      newItems[index] = newItem

      setItems(newItems)
    }

    setEditItemId(null);
  }

  const handleDeleteClick = (item) =>{
    // console.log("targetItemId: " + item.id);
    const targetItemId = item.id;
    let newItems = [...items];
    const index = items.findIndex((item)=>{
      return item.id === targetItemId
    })

    newItems.splice(index, 1);

    setItems(newItems)
  }

  const handleSaveList = async () => {
    setLoading(true);
    const wishlistData = {
        "id": props.list.id,
        "name": name,
        "items": items
    }

    // console.log(JSON.stringify(wishlistData))
    try{
        const idToken = await props.currentUser.getIdToken(true);
        const response = await axios.post(apiUrl + '/updatelist',
        {wishlistData},
        {
            headers: {
              Authorization: `Bearer ${idToken}`,
            }
        });
        // setLists(response.data);
        navigate(0)
        
    }catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
  }

  useEffect(() => {
    if (validLink) {
      setError('')
      axios.get(validLink).then(response => {
        const $ = cheerio.load(response.data);
        
        let foundName = $('h1#title').text();
        if(!foundName){
          foundName =  $('h1').text();
        }
        const findPrice = $('[class*="price"]').text()

        const regex = /\$\d+(\.\d{1,2})?/g; // regex to match dollar amounts
        const matches = findPrice.match(regex); // get all matches
        const newFormData = {...addFormData}

        if(foundName){
          newFormData['itemName'] = foundName.trim();
        } else{
          throw new Error('Unable to find name')
        }
        if (matches && matches.length > 0) {
          const firstMatch = matches[0];
          const price = firstMatch.replace('$', '');
          newFormData['itemPrice'] = price;
        } else {
          throw new Error('Unable to find price') 
        }
        setAddFormData(newFormData);
      }).catch(error => {
        console.log(error)
        toast.error("Could  not automatically retrieve data from link", {
          position: toast.POSITION.TOP_RIGHT
        });
        setValidLink('');
      }).finally(
        setLoading(false)
      )
      
      ;
    }
  }, [validLink]);

  const handleLinkChange = (event) => {
    const linkRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    const value = event.target.value;
    if(value.length < 1) {
      setError('');
      setValidLink('');
    } else if(linkRegex.test(value)){
      setError('');
      setValidLink(value);
      setLoading(true);
    } else {
      setError('Double check your link, it doesnt look right');
      setValidLink('');
    }
    handleAddFormChange(event);
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
            <Loading isLoading={isLoading}/>
              <div>
                <div className="py-6 px-4 list-header w-100 font-bold leading-6 text-gray-500">
                <button
                    className="mt-4 py-2 px-4 text-white rounded-md hover:text-violet-500"
                    onClick={props.handleEditClose}
                  >
                    	&larr; Back
                  </button>
                    <div className="mx-auto text-center">
                      <div className="text-sm font-light text-gray-300"> Edit View </div>
                      <div className="flex gap-2 px-2">
                        <div className="text-xl font-bold">
                          {
                            nameEdit ? (
                              <input type="text" value={name} className="w-full bg-transparent border-none rounded py-0 text-gray-200"
                              onChange={(event) => setName(event.target.value)}/>
                            ) : ( name )
                          
                          } </div>
                        <div className="flex"
                          onClick={() => setNameEdit(!nameEdit)}
                        >
                          {
                            nameEdit ? 
                            <CheckIcon className="mt-1.5 w-4 h-4" 
                            />  : <PencilIcon className="mt-1 w-4 h-4 self-center" /> 
                          }
                        </div>
                        
                      </div>
                     
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveList}
                    className="group relative flex justify-center rounded-md py-2 px-3 border text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    Save List
                  </button>
                  
                </div>
                {/* <form> */}
                <table className="border-collapse w-full overflow-scroll table-auto text-gray-500">
                    <thead>
                        <tr className="bg-gray-50 border-b text-left">
                        <th className="p-3 font-bold w-full">Name</th>
                        {/* <th className="text-left p-3 font-bold text-gray-600">Link</th> */}
                        <th className=" p-3 font-bold">Price</th>
                        <th className="p-3 font-bold">Quantity</th>
                        <th className="p-3 font-bold flex">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.list.items && (items.map((item) => (
                          <>
                          {
                            editItemId === item.id ? (
                              <EditableRow 
                              key={"edit" + item.id}
                              item={item} 
                              editFormData={editFormData}
                              handleEditDoneClick={handleEditDoneClick} 
                              handleEditFormChange={handleEditFormChange} />
                            ) : (
                              <ReadOnlyRow 
                              key={"read" + item.id}
                              item={item} 
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}/>
                            )
                          }
                          </>
                        )))}
                          <tr className="">
                            <td className="border-b flex">
                              <PlusIcon className="w-7 h-7 mt-1.5 ml-1" onClick={handleAddFormSubmit}/>
                              <input className="placeholder-gray-300" type="text" required name="itemName" value={addFormData.itemName} onChange={handleAddFormChange} placeholder="Name*"/>
                              <input className="placeholder-gray-300 md:w-auto" type="text" name="itemLink" value={addFormData.itemLink} onChange={handleLinkChange} placeholder="Link"/>
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
                              value={addFormData.itemPrice}
                              onChange={(event) => {
                                  const input = event.target.value;
                                  const regex = /^[0-9]*(?:\.[0-9]{0,2})?$/;
                                  if (regex.test(input)) {
                                    handleAddFormChange(event)
                                  }
                              }}
                            />
                              {/* <input  className="placeholder-gray-300 md:w-28" type="number" min=".01" step=".01" required name="itemPrice" value={addFormData.itemPrice} onChange={handleAddFormChange}  placeholder="$*"/> */}
                            </td>
                            <td className="border">
                              <input className="placeholder-gray-300 md:w-28" type="number" min="1" required name="itemQuantity"  value={addFormData.itemQuantity} onChange={handleAddFormChange} placeholder="#*"/>
                            </td>
                            <td className="border">
                            {/* <input className="placeholder-gray-300 md:w-28" type="number" min="1" required name="itemPriority" onChange={handleAddFormChange} placeholder="3"/>  */}
                              <select value={addFormData.itemPriority} className="md:w-36" required name="itemPriority" onChange={handleAddFormChange}>
                                <option value="5">Urgent</option>
                                <option value="4">High</option>
                                <option value="3">Medium</option>
                                <option value="2">Low</option>
                                <option value="1">No Priority</option>
                              </select>
                            </td>
                          </tr>
                          {error && <tr><td colSpan="4" className="text-red-500 px-4">{error}</td></tr>}
                    </tbody>
                    </table>
                  {/* </form> */}
              </div>
            </div>
    </Transition>
  );
}