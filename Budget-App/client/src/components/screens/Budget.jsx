import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../util/authContext";
import Loading from "../Loading";
import axios from "axios";
import { apiUrl } from "../../config/apiUrl";
import Select from "react-select"
import budgetItems from "../../util/budgetAlgorithm";
import { toast } from 'react-toastify';
export default function Budget() {
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMeta] = useState([]);
    const [selectedLists, setSelectedLists] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [remaining, setRemaining] = useState([]);
    const [budgeted, setBudgeted] = useState(false);
    const [selectedReccItems, setSelectedReccItems] = useState([]);
    const [selectedRemItems, setSelectedRemItems] = useState([]);
    const [budget, setBudget] = useState(20);
    const [remainingBudget, setRemainingBudget] = useState(null);

    useEffect(() => {
        const getMeta = async () => {
            try{
                const idToken = await currentUser.getIdToken(true);
                const response = await axios.get(apiUrl + '/allmeta', {
                    headers: {
                      Authorization: `Bearer ${idToken}`,
                    }
                });
                setMeta(response.data);
                
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        if(currentUser){
            getMeta();
        }
    }, [currentUser]);

    if(!currentUser){
        return <Navigate to="/login" />;
    }

    const handleSelect = (selectedOptions) => {
        setSelectedLists(selectedOptions);
        
    };

    const handleBudgetSubmit = async () => {
        if(selectedLists.length < 1){
            toast.error('Select atleast one Wishlist to budget', {
                position: toast.POSITION.TOP_RIGHT
              });
        } else if(budget < .01){
            toast.error('Enter a valid budget', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else{
            const wishlistIds = selectedLists.map(item => item.value);

            setLoading(true);
            if(currentUser){
                try{
                    const idToken = await currentUser.getIdToken(true);
                    const response = await axios.get(apiUrl + '/lists',
                    {
                        params: {
                            "wishlistIds": wishlistIds
                        },
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        'Content-Type': 'application/json'
                        }
                    });
                    
                    const data = await response.data
                    const results = budgetItems(data.items, budget)
                    setRecommended(results.recommended);
                    setRemaining(results.remaining.reverse());
                    setBudgeted(true);
                    setSelectedReccItems(results.recommended);
                    setRemainingBudget(results.budget);
                    
                }catch(error){
                    console.log(error);
                }finally{
                    setLoading(false);
                }
            }
        }
    }

    const deleteItems = async (body) => {
        setLoading(true);
            if(currentUser){
                try{
                    const idToken = await currentUser.getIdToken(true);

                    const response = await axios.post(apiUrl + '/deleteitems',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    });
                    
                    if (response.status !== 200){
                        throw new Error("Invalid response")
                    }
                }catch(error){
                    console.log(error);
                    throw new Error(error.message);
                }finally{
                    setLoading(false);
                }
            }
    }

    const updateItems = async (body) => {
        setLoading(true);
            if(currentUser){
                try{
                    const idToken = await currentUser.getIdToken(true);
                    const response = await axios.post(apiUrl + '/updateItems',
                        body,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.status !== 200){
                        throw new Error("Invalid response")
                    }
                }catch(error){
                    console.log(error);
                    throw new Error(error.message);
                    
                }finally{
                    setLoading(false);
                }
            }
    }

    const handleUpdateClick = async() => {
        if(selectedReccItems.length === 0 && selectedRemItems.length === 0){
            toast.error('You havent selected any items to update', {
                position: toast.POSITION.TOP_RIGHT
            });
          
        } else{
            // console.log(selectedReccItems);
            // console.log(selectedRemItems);
              
            //O(n*m)
            // let update = [];
            // let newSelectedReccItems = selectedReccItems.filter((item) => {
            // if (remaining.some((remainingItem) => remainingItem.id === item.id && !selectedRemItems.some((selectedRemItem) => selectedRemItem.id === item.id))) {
            //     update.push(remaining.find((remainingItem) => remainingItem.id === item.id));
            //     return false;
            // }
            // return true;
            // });

            //O(n)
            /**If there is an item in selectedReccItems that is in remaining but not in selectedRemItems, 
             * add the item from remaining into an array called update and remove the item with the same id from selectedReccItems */
            const remainingMap = new Map(remaining.map((item) => [item.id, item]));
            let toUpdate = [];
            const newSelectedReccItems = selectedReccItems.filter((item) => {
            if (remainingMap.has(item.id) && !selectedRemItems.some((selectedRemItem) => selectedRemItem.id === item.id)) {
                toUpdate.push(remainingMap.get(item.id));
                return false;
            }
            return true;
            });

            const toDelete = [...newSelectedReccItems, ...selectedRemItems];
            // console.log(toDelete);
            // console.log(toUpdate);
            
            //if theres only one parent wishlist selected
            if(selectedLists.length === 1){
                const delItemIds = toDelete.map((obj) => obj.id);
                try{
                    const delBody = {
                        "wishlistId": selectedLists[0],
                        "itemIds": delItemIds
                    }
                    deleteItems(delBody);
    
                    const upItems = toUpdate.map((wishlistId, ...rest)=> rest)
                    const upBody = {
                        "wishlistId": selectedLists[0],
                        "items": upItems
                    }
                    updateItems(upBody);

                    toast.success("Updated wishlist", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } catch(error){
                    toast.error("Unable to update wishlist at this time", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            //if theres been more than one parent wishlist selected
            } else{
                let toDeleteParents = {}
                let toUpdateParents = {}
                for(const item of toDelete){
                    if(!(item.wishlistId in toDeleteParents)){
                        toDeleteParents[item.wishlistId] = []
                    }

                    toDeleteParents[item.wishlistId].push(item.id)
                }

                for(const item of toUpdate){
                    if(!(item.wishlistId in toUpdateParents)){
                        toUpdateParents[item.wishlistId] = []
                    }
                    const {wishlistId, ...rest} = item;
                    toUpdateParents[item.wishlistId].push(rest)
                }

                try{
                    for (const key in toDeleteParents){
                        const body = {
                            "wishlistId": key,
                            "itemIds": toDeleteParents[key]
                        }
                        // console.log(body);
                        deleteItems(body);
                    }
    
                    for (const key in toUpdateParents){
                        const body = {
                            "wishlistId": key,
                            "items": toUpdateParents[key]
                        }
                        // console.log(body);
                        updateItems(body);
                    }
                    toast.success("Updated wishlists", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }catch(error){
                    toast.error("Unable to update wishlists at this time", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
            
        }
    }

    return (
        currentUser && 
      <div className="mx-4 pageContainer">
        <Loading isLoading={isLoading}/>
          <div className="w-100 p-5">
            <div className="pb-4 custom-border-bottom">
                <h1 className="font-bold tracking-tight text-white-200 text-xl">
                    Budget
                </h1>
            </div>

            <div className="mt-4">
            {
                meta.length > 0 ? (
                    <>
                    <p className="text-gray-200 leading-6 mt-2 pb-4 ">
                        Budgeter will tell you, based on inputted priortity, which items you should get and which ones you should hold off on.
                        <br/> All you have to do is answer these two questions*:
                    </p>
                    <form className="custom-border-bottom">
                    <div className="flex flex-col sm:flex-row gap-4 pb-5 items-end">
                        <div className="w-full">
                            <p  className="w-full text-gray-200 font-semibold">
                                Which Wishlists Do You Want To Include?
                            </p>
                            <div className=" border border-purple-500 rounded">
                                <Select
                                    isMulti
                                    options={meta}
                                    value={selectedLists}
                                    onChange={handleSelect}
                                    className="w-full text-gray-800 bg-indigo-950 !important"
                                    classNamePrefix="select"
                                    placeholder="Select Wishlists"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <p  className="w-full text-gray-200 font-semibold">
                            How Much Do You Want To Spend?
                            </p>
                            <div className="flex border border-purple-500 rounded pl-1 bg-white">
                                <p className="text-gray-800 self-center pl-2">$</p>
                                <input
                                    id="budgetDollars"
                                    name="budgetDollars"
                                    type="text"
                                    autoComplete="budgetDollars"
                                    required
                                    pattern="^\d+(\.\d{1,2})?$"
                                    className="relative px-2 rounded-tl  rounded-bl text-gray-800block w-full border-0 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-0 focus:ring-inset focus:ring-purple-500"
                                    value={budget}
                                    onChange={(event) => {
                                        const input = event.target.value;
                                        const regex = /^[0-9]*(?:\.[0-9]{0,2})?$/;
                                        if (regex.test(input)) {
                                        setBudget(input);
                                        }
                                    }}
                                />
                                <button
                                type="button"
                                onClick={handleBudgetSubmit}
                                className="ml-auto justify-center rounded-tr rounded-br bg-purple-500 py-1 px-3 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                                >
                                    Budget!
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="mb-4"> *Be sure to review the results and use your discretion </p>
                    </form>
                    {
                        budgeted && (
                            <> 
                                 <div className="pt-6 pb-8 custom-border-bottom">
                                    <p  className="w-full text-lg text-gray-200 font-semibold">
                                        Reccomended Items
                                    </p>
                                    <p className="mb-4">These are items that are within your budget and have the highest priority</p>
                                    <table className="border-collapse w-full overflow-scroll table-auto text-gray-500">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="purp text-left p-3 font-bold w-full">Name</th>
                                                {/* <th className="purp text-left p-3 font-bold">Link</th> */}
                                                <th className="purp text-left p-3 font-bold">Price</th>
                                                <th className="purp text-left p-3 font-bold">Quantity</th>
                                                <th className="purp text-left p-3 font-bold">Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recommended.length > 0 ? (recommended.map((item) => (
                                            <tr key={item.id} className="bg-white border-b">
                                                <td className="p-3">
                                                    <input
                                                    className="border border-purple-500 rounded h-4 w-4 text-purple-500 focus:outline-none ring-2 focus:ring-purple-500 ring-purple-500 mr-2 "
                                                    type="checkbox"
                                                    checked={selectedReccItems.includes(item)}
                                                    onChange={(event) => {
                                                        if (event.target.checked) {
                                                        setSelectedReccItems([...selectedReccItems, item]);
                                                        } else {
                                                        setSelectedReccItems(selectedReccItems.filter((selectedItem) => selectedItem !== item));
                                                        }
                                                    }}
                                                    />
                                                    {item.link.length > 0 ? (
                                                    <a href={item.link}>{item.name}</a>
                                                    ) : (
                                                    item.name
                                                    )}
                                                </td>
                                                <td className="p-3">${item.price}</td>
                                                <td className="p-3 text-center">{item.quantity}</td>
                                                <td className="p-3 priority" data-priority={item.priority}></td>
                                            </tr>
                                            ))) : (
                                             <tr>
                                                <td colSpan="4" className="p-3" >Unfortunatly, we cannot recommend any items that are within your budget. Consider raising your budget</td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="flex pt-8 px-1 font-semibold">
                                    <p>Leftover Budget </p>
                                    <p className="ml-auto">${remainingBudget}</p>
                                </div>
                                </div>
                                
                                <div className="pt-6 pb-8 custom-border-bottom">
                                    <p  className="w-full text-lg text-gray-200 font-semibold">
                                        Reamining Items
                                    </p>
                                    <p className="mb-4">These are items that you should probably wait to buy</p>
                                    <table className="border-collapse w-full overflow-scroll table-auto text-gray-500">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="purp text-left p-3 font-bold w-full">Name</th>
                                                {/* <th className="purp text-left p-3 font-bold">Link</th> */}
                                                <th className="purp text-left p-3 font-bold">Price</th>
                                                <th className="purp text-left p-3 font-bold">Quantity</th>
                                                <th className="purp text-left p-3 font-bold">Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {remaining.length > 0 ? (remaining.map((item) => (
                                            <tr key={item.id} className="bg-white border-b">
                                            <td className="p-3">
                                                <input
                                                className="border border-purple-500 rounded h-4 w-4 text-purple-500 focus:outline-none ring-2 focus:ring-purple-500 ring-purple-500 mr-2 "
                                                type="checkbox"
                                                checked={selectedRemItems.includes(item)}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setSelectedRemItems([...selectedRemItems, item]);
                                                    } else {
                                                        setSelectedRemItems(selectedRemItems.filter((selectedItem) => selectedItem !== item));
                                                    }
                                                }}
                                                />
                                                {item.link.length > 0 ? (
                                                <a href={item.link}>{item.name}</a>
                                                ) : (
                                                item.name
                                                )}
                                            </td>
                                            <td className="p-3">${item.price}</td>
                                            <td className="p-3 text-center">{item.quantity}</td>
                                            <td className="p-3 priority" data-priority={item.priority}></td>
                                        </tr>
                                            ))) : (
                                                <tr>
                                                    <td colSpan="4" className="p-3" >No remaining items. We were able to purchase everything in your Wishlist(s)!</td>
                                                </tr>
                                               
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 pb-32">
                                    <p  className="w-full text-lg text-gray-200 font-semibold">
                                        What did you actually buy?
                                    </p>
                                    <p className="mb-4"> Select the checkmark next to the items that you actually purchased and then click update list so your wishlits can be updated accordingly. You dont have to update your wishlists, you can just use this tool to see reccomendations. </p>
                                    <button
                                    type="button"
                                    onClick={handleUpdateClick}
                                    className="w-full rounded py-2 bg-purple-500 py-1 px-3 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                                    >
                                        Update My Wishlist(s)
                                    </button>
                                </div>
                            </>

                        )
                    }
                </>
                ) : (
                    <div>
                    <p className="text-md leading-8 text-gray-200 font-semibold">
                        You do not currently have any wishlists. 
                    </p>
                    <p className="text-gray-200 leading-6 mt-2">
                        Once you have one or more wishlists, use this tab to enter a budget.
                        <br/> Budgeter will tell you, based on inputted priortity, which items you should get and which ones you should hold off on.
                    </p>
                    </div>
                )
            }  
                <div>

                </div>
            </div>

          </div>
          <div
            className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(100%-50rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
    )
  }
  