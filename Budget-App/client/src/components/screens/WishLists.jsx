import { useState } from "react";
// import {useNavigate} from "react-router-dom"
import { PencilSquareIcon, EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import PreviewModal from "../PreviewModal";
import Edit from "./Edit";
import Data from '../../mock-data.json'
export default function WishLists() {
    const [lists, setLists] = useState(Data.lists);
    const [selectedList, setSelectedList] = useState(null);
    const [listModalIsOpen, setPreviewModalIsOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [addFormData, setAddFormData] = useState({

    })
    // const navigate = useNavigate();
    
    const handlePreviewClick = (selectedList) => {
        setSelectedList(selectedList);
        setShowEdit(false);
        setPreviewModalIsOpen(true);
    }

    const handleEditClick = (selectedList) => {
        setSelectedList(selectedList);
        setShowEdit(true);
        setPreviewModalIsOpen(false)
    }
    
    const handleCloseModal = () => {
        setSelectedList(null);
        setShowEdit(false);
        setPreviewModalIsOpen(false);
    }

    const handleEditClose = () => {
        setSelectedList(null);
        setShowEdit(false);
        setPreviewModalIsOpen(false)
    }

    return (
        <>
        { showEdit ? (
        <div className="bg-white pageContainer">
            <Edit list={selectedList} showEdit={showEdit} handleEditClose={handleEditClose}/>
        </div>) :   
        (<div className="mx-4 pageContainer">
        <section aria-labelledby="projects-heading" className="pt-6 pb-24">
            <div className="lg:col-span-3">
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4'>
                {/* <Link to="/add"> */}
                <div className="add-list rounded-lg ">
                    <PlusIcon className="w-10 h-10"/>
                    <p className='mt-2 text-md'>Add a Wish List</p>
                </div>
                {/* </Link> */}
                {lists.map((list) => (
                <div className="rounded-lg shadow-md list">
                <div  key={list.id}>
                    <div className="p-4 list-header rounded-t">
                        <div className="flex">
                            <h2 className="text-md font-medium">{list.name}</h2>
                            {/* <EyeIcon className="ml-2 w-5 h-5 text-gray-200" onClick={()=> handlePreviewClick(list)}/> */}
                        </div>
                        <div className="flex">
                            <PencilSquareIcon className="mr-2 w-5 h-5 text-gray-200" onClick={()=> handleEditClick(list)}/>
                            <TrashIcon className="w-5 h-5 text-gray-200"/>
                        </div>
                    </div>
                    
                    <div className="listBody rounded-b" onClick={()=> handlePreviewClick(list)}>
                        {
                            list.items.slice(0,4).map((item, index) => (
                                <div className="listItem text-sm" key={index}>
                                &#x2022; {item.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
                ))}
            </div>
            </div>
    </section>
    {
        selectedList && <PreviewModal list={selectedList} listModalIsOpen={listModalIsOpen} handleModalClose={handleCloseModal} handleEditClick={handleEditClick}/>
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
    )
    }
    </>
    )
}