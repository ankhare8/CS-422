import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../util/authContext';
import { Navigate, useNavigate } from "react-router-dom";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import PreviewModal from "../PreviewModal";
import Loading from "../Loading";
import Edit from "../Edit";
import { apiUrl } from "../../config/apiUrl";
import { toast } from 'react-toastify';

export default function WishLists() {
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [listModalIsOpen, setPreviewModalIsOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState('Guest')
    const navigate = useNavigate();
    // if(!currentUser){
    //     return <Navigate to="/login" />;
    // }

    useEffect(() => {
        const getAllListData = async () => {
            setLoading(true)
            try{
                const idToken = await currentUser.getIdToken(true);
                const response = await axios.get(apiUrl + '/alllists', {
                    headers: {
                      Authorization: `Bearer ${idToken}`,
                    }
                });
                const data = response.data
                setLists(data.wishlistsData);
                if(data.name.length > 0){
                    setName(data.name)
                }
                
            }catch(error){
                console.log(error);
                navigate('/login')
            }finally{
                setLoading(false);
            }
        };
        if(currentUser){
            getAllListData();
        }
    }, [currentUser]);

    useEffect(() => {
        if(currentUser){
            const selectedId = window.location.hash.slice(1);
            if(selectedId){
                if(lists.length > 0){
                    const selectedList = lists.find(list => list.id === selectedId);
                    if (selectedList) {
                        setSelectedList(selectedList);
                        setPreviewModalIsOpen(true);
                    } 
                }
                //  else {
                //     toast.error('Unable to find wishlist', {
                //         position: toast.POSITION.TOP_RIGHT
                //     });
                // }
            }
        }
    }, [lists, currentUser]);

    const handlePreviewClick = (selectedList) => {
        setSelectedList(selectedList);
        setShowEdit(false);
        window.location.hash = selectedList.id;
        setPreviewModalIsOpen(true);
    }

    const handleListEditClick = (selectedList) => {
        setSelectedList(selectedList);
        setShowEdit(true);
        setPreviewModalIsOpen(false)
    }

    const handleListDeleteClick = async (listIn) => {
        setLoading(true);
        try{
            const idToken = await currentUser.getIdToken(true);
            await axios.post(`${apiUrl}/deletelist`, 
            {
                wishlistId: listIn.id,
            },
            {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
            });
            navigate(0);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    
    const handleCloseModal = () => {
        setSelectedList(null);
        setShowEdit(false);
        window.location.hash = '';
        setPreviewModalIsOpen(false);
    }

    const handleEditClose = () => {
        setSelectedList(null);
        setShowEdit(false);
        setPreviewModalIsOpen(false)
    }

    return (
        <>
        <Loading isLoading={isLoading}/>
        {
            currentUser && (
                <>
                { showEdit ? (
                    <div className="bg-white pageContainer">
                        <Edit 
                        list={selectedList} 
                        showEdit={showEdit} 
                        handleEditClose={handleEditClose}
                        currentUser={currentUser}
                        />
                    </div>
                ) : (
                    <div className="mx-4 pageContainer">
                    <section aria-labelledby="projects-heading" className=" pb-24">
                        <div className="custom-border-bottom py-6 mb-6">
                            <h1 className="font-bold tracking-tight text-white-200 text-xl">
                                {name}'s Wishlists
                            </h1>
                            <p className="font-light">Click on a list to quick view the complete list and information. Use the edit icon for each list to add or edit items within the list.</p>
                        </div>
                        <div className="lg:col-span-3">
                            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4'>
                            <Link to="/add">
                                <div className="add-list rounded-lg ">
                                    <PlusIcon className="w-10 h-10"/>
                                    <p className='mt-2 text-md'>Add a Wish List</p>
                                </div>
                            </Link>
                            { !isLoading && (lists.length > 0 ? ( lists.map((list) => (
                                <div className="rounded-lg shadow-md list" key={list.id}>
                                    <div>
                                        <div className="p-4 list-header rounded-t">
                                            <div className="flex">
                                                <h2 className="text-md font-medium">{list.name}</h2>
                                                {/* <EyeIcon className="ml-2 w-5 h-5 text-gray-200" onClick={()=> handlePreviewClick(list)}/> */}
                                            </div>
                                            <div className="flex">
                                                <PencilSquareIcon className="mr-2 w-5 h-5 text-gray-200" onClick={()=> handleListEditClick(list)}/>
                                                <TrashIcon className="w-5 h-5 text-gray-200" onClick={()=> handleListDeleteClick(list)}/>
                                            </div>
                                        </div>
                                        
                                        <div className="listBody text-gray-600 rounded-b" onClick={()=> handlePreviewClick(list)}>
                                            {
                                                list.items.slice(0,4).map((item) => (
                                                    <div className="listItem text-sm" key={item.id}>
                                                    &#x2022; {item.name}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                             ))) : (
                            <div className="flex self-center">
                                <p className="mx-auto text-gray-200">
                                    Nothing to see here... yet.
                                </p>
                            </div>
                            ))}
                            </div>
                        </div>
                    </section>
                    {
                        selectedList && <PreviewModal list={selectedList} listModalIsOpen={listModalIsOpen} handleModalClose={handleCloseModal} handleListEditClick={handleListEditClick}/>
                    }
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
                
                )}</>
            )
        }
    </>
    )
}