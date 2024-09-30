import { Stripe } from "stripe";
import ButtonCheckout from "../components/ButtonCheckout";

async function loadPricing() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort((a, b) => a.unit_amount - b.unit_amount);
  return sortedPrices;
}

    // Start of Selection
async function PricingPage() {
  const prices = await loadPricing();
  console.log(prices);
  
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Unite a nosotros! 
          </h2>
          
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {prices.map(({ id, unit_amount, recurring, metadata }, index) => (
            <div
              key={index}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <h3 className="mb-4 text-2xl font-semibold">Sumate!</h3>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${(unit_amount / 100).toFixed(2)}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {metadata && Object.entries(metadata).map(([key, value], featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{`${value}`}</span>
                  </li>
                ))}
              </ul>
             <ButtonCheckout priceId={id}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingPage;
