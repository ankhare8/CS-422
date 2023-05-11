import { Link } from "react-router-dom"
export default function Home() {
    return (
      <div className="mx-4 pageContainer">
          <div className="mx-auto max-w-2xl py-32 sm:py-48">
            <div className="mb-8 flex justify-center text-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-200/10 hover:ring-gray-200/20">
                Getting started on your responsible spending journey?{' '}
                <a href="https://consumer.gov/managing-your-money/making-budget" target="blank" className="font-semibold text-purple-400 hover:text-purple-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Check Out These Resources <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white-200 sm:text-6xl">
                Welcome to Budgeter
              </h1>
              <p className="mt-6 text-md leading-8 text-gray-200">
              Financial independnce and empowerment start with responsible spending habits and careful budgeting. Budgeter is here to make it easier for you to get items on your wishlist while staying within your budget.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    href="/demo"
                    className="rounded-md bg-purple-500 py-2 px-3.5 text-sm font-semibold text-white hover:text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                  View Demo
                </a>
                <Link to="/about" className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-600">
                  About Us <span aria-hidden="true">→</span>
                </Link>
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
  