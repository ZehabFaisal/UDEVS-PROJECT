// import React from 'react'
// import Hero from '../Components/Hero';
// import Features from '../Components/Features';
// import Trust from '../Components/Trust';

// const Home = () => {
//   return (
//     <div>
//         <Hero />
//         <div className="mx-auto max-w-6xl px-6 pb-8 text-sm text-gray-600">
//           <p className="rounded-lg border border-blue-100 bg-blue-50 p-3">
//             The frontend now connects to the backend authentication and job APIs for a live recruitment experience.
//           </p>
//         </div>
//         <Features />
//         <Trust />
//     </div>
//   )
// }
// export default Home;

import React from 'react'
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import Trust from '../Components/Trust';

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <Trust />
    </div>
  )
}
export default Home;