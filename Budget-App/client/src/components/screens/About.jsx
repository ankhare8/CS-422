import { EnvelopeIcon, GlobeAltIcon} from '@heroicons/react/24/outline'
const teamData = [
    {
        "photo": "https://anshitakhare.com/project-repo-media/anshita.png",
        "name": "Anshita Khare",
        "role": "Software Development and Design",
        "blurb": "I had a lot of fun working on the frontend, backend, and database portion of this project using the Node.js, Express, React and Firestore and Firebase microervices for user authentication",
        "ul": [
          "All uploaded documentation is stored in a Google Drive folder that can be accessed by the admins and manually manipulated if needed. This was done using the Google Drive API and a Google service account",
          "When projects with a Github link are uploaded, language tags and automatically retrieved by making a query to the Github API the using the path in the supplied URL.",
          "When users click on a wishlist, a unique identifier is added to the URI using a hash fragment. This enables users to save links to specific lists knowing that that link is opened the same modal will be visible",
          "This website is fully responsive"
        ],
        "linkedin": "https://www.linkedin.com/in/an-khare-1051a4260",
        "email": "mailto: ankhare8@gmail.com",
        "website": "https://anshitakhare.com"
    },
    {
      "photo": "https://anshitakhare.com/project-repo-media/rigo.png",
      "name": "Rigoberto Rosa",
      "role": "Requirements, Software Development, Testing",
      "blurb": "With this project I delved into the world of backend development, honing my skills and expertise in MongoDB, Express, and Node.js. Additionally, I had the opportunity to learn about unit testing, which helped me ensure the reliability and stability of our code. This journey has further fueled my enthusiasm for computer science and its ability to shape the future.",
      "linkedin": "www.linkedin.com/in/rigobertorosa",
      "email": "mailto:rigorosa@bu.edu"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/soi.png",
        "name": "Supawadee Phakdee",
        "role": "Project Management",
        "blurb": "As the project manager, I ensured that all project aspects were well-planned, documented, and executed for a successful delivery. My key activities included developing and maintaining a Configuration Items List to track project components, creating personas to understand the target audience, maintaining an Estimation Record to track progress, developing Use Cases to define features, and creating a State Transition Diagram to map component interactions over time. I also ensured effective integration of all tools and technologies by creating a Tool Connectivity Diagram",
        "linkedin": "https://www.linkedin.com/in/supawadee-phakdee/",
        "email": "mailto:souy.supawadee@gmail.com"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/marouan.png",
        "name": "Marouan Boussif",
        "role": "Testing",
        "blurb": "For this project, I used libraries like HTTPMocks to test project routes in the server. Remember, every day is a new opportunity to learn, grow, and make a difference",
        "linkedin": "https://www.linkedin.com/in/marouan-boussif-790004118/",
        "email": "mailto:marouan_usa2008@outlook.fr"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/ayoub.png",
        "name": "Ayoub Amghar",
        "role": "Wireframes",
        "blurb": "I experimented with Adobe XD but ultimately used Balsamiq to create wireframes for this project. I carefully positioned each element and adjusted their properties to create a detailed wireframe that accurately represented the app's functionality and layout. Once I was satisfied with the wireframe, I exported it as a PDF and shared it with our team for feedback.",
        "linkedin": "https://www.linkedin.com/in/ayoub-amghar-494910182/",
        "email": "mailto:amghar1a@bu.edu"
    }
]

export default function About() {
    return(
      <div className="mx-4 pageContainer">
          <div className="p-5">
            <h1 className="font-bold tracking-tight text-white-200 text-xl pb-4 custom-border-bottom">
                Learn More
            </h1>
            <p>
            <span className='font-semibold text-purple-200'>Why? </span> In the age of Klarna and Afterpay, it is more important than ever to practice responsible spending habits. With Budgeter, you can create wishlists and prioritize your spending within a budget, ensuring that you are not overspending or going into debt. Make more informed purchasing decisions and maintain financial well-being in the long run — with Budgeter
            </p>

            <div className='mt-8'>
              <a href="https://www.beautiful.ai/player/-NV0MmTVC6KjtKOZ3Dkt">Browse Our Full Project Prentation</a>
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
  