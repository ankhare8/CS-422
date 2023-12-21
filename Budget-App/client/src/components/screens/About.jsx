import { EnvelopeIcon, GlobeAltIcon} from '@heroicons/react/24/outline'
const teamData = [
    {
        "photo": "https://anshitakhare.com/project-repo-media/anshita.png",
        "name": "Anshita Khare",
        "role": "Software Development and Design",
        "blurb": "I had a lot of fun working on this project using Node.js, Express, React and Firestore and Firebase microservices for user authentication. My goal was to create a user-friendly and and intuitive interface that allowed users to keep track of things that they want to buy while also helping them make the most prudent pruchasing decisions within a given budget.Here are some of my favorite things about it",
        "ul": [
          "I added a pretty cool budgeting feature that is able to accept multiple wishlists and a desired budget amount as input. This feature first combines all lists and sorts through them, reccomending only the highest priority items. After this the data is displayed in two tables, reccomended and remaining. The user can then manually select which items were purchased and the respective parent wishlists of those items will be updated accordingly",
          "After looking at predictable trends in the HTML formatting of ecommerce websites built using Shopify and Amazon, I wrote a function that can extract the name and price for an item when a valid link is entered.",
          "When users click on a wishlist, a unique identifier is added to the URI using a hash fragment. This enables users to bookmark links to specific wishlists and can easily refer back to them as they desire",
          "This website is fully responsive"
        ],
        "linkedin": "https://www.linkedin.com/in/an-khare-1051a4260",
        "email": "mailto: ankhare8@gmail.com",
        "website": "https://anshitakhare.com"
    },
]

export default function About() {
    return(
      <div className="mx-4 pageContainer">
          <div className="p-5">
            <h1 className="font-bold tracking-tight text-white-200 text-xl pb-4 custom-border-bottom">
                Learn More
            </h1>
            <p className='mt-4'>
            <span className='font-semibold text-purple-200'>Why? </span> In the age of Klarna and Afterpay, it is more important than ever to practice responsible spending habits. With Budgeter, you can create wishlists and prioritize your spending within a budget, ensuring that you are not overspending or going into debt. Make more informed purchasing decisions and maintain financial well-being in the long run — with Budgeter
            </p>

            <div className='mt-8'>
              <a href="https://mysterious-cover-7da.notion.site/Coming-Soon-1810f0a236984b219048f06af4487ffb?pvs=4">View Our Full Project Presentation</a>
            </div>
               

          </div>
          <div className="p-5">
            <h1 className="font-bold tracking-tight text-white-200 text-xl pb-4 custom-border-bottom">
                About Us
            </h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-6">
            {teamData.map((member, index) => (
              <li key={index} className="col-span-1 flex bg-black rounded-lg shadow divide-x divide-gray-200 bg-opacity-20">
                <div className="hidden lg:flex">
                  <img
                    className="object-contain rounded-tl-lg rounded-bl-lg" style={{maxWidth: 15 + 'vw', height: "auto"}}
                    src={member.photo}
                    alt={member.name}
                  />
                </div>
                <div className="px-4 py-2 text-sm">
                  <h3 className="text-lg font-medium text-white">{member.name}</h3>
                  <p className="text-white text-md ">{member.role}</p>
                  <p className="text-white break-words my-2">{member.blurb}</p>
                  {
                    member.ul && (
                      <ul className="list-disc text-white-800 break-words my-4 ml-10">
                        {
                           member.ul.map((li, index) => (
                            <li key={index} className="mb-2">{li}</li>
                            ))
                        }
                      </ul>
                    )}
                  <div className="flex gap-2 my-2">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <svg className="w-5 h-5 pb-1 -mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> 
                            <path fill="#a65ad8" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                        </svg>
                    </a>
                    <a href={member.email} target="_blank" rel="noopener noreferrer">
                        <EnvelopeIcon className="w-5 h-5 ml-1 text-purple-500"/>
                    </a>
                    {
                      member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer">
                            <GlobeAltIcon className="w-5 h- text-purple-500"/>
                        </a>
                      )
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
  