"use client"

function ButtonCheckout({priceId}) {
  return (
    <button
        onClick={async()=>{
          const response = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({priceId}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          window.location.href = data.url
        }}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-indigo-900"
        >
          Get Started
        </button>
  )
}

export default ButtonCheckout