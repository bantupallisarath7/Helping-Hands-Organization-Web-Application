// import { useState } from "react";

// const LandingPage = () => {
//   const [view, setView] = useState("home");

//   const renderView = () => {
//     switch (view) {
//       case "home":
//         return (
//           <section className="text-center py-16 px-6">
//             <h1 className="text-4xl font-bold text-red-900">Helping Hands Organization</h1>
//             <p className="text-gray-700 mt-4 max-w-xl mx-auto">
//               Empowering students through transparent fundraising. Join us in making education accessible.
//             </p>
//             <div className="mt-6 flex justify-center gap-4">
//               <button onClick={() => setView("campaigns")} className="bg-red-900 text-white px-6 py-2 rounded">
//                 View Campaigns
//               </button>
//               <button onClick={() => setView("about")} className="border border-red-900 text-red-900 px-6 py-2 rounded">
//                 Learn More
//               </button>
//             </div>
//           </section>
//         );
//       case "campaigns":
//         return (
//           <section className="py-16 px-6">
//             <h2 className="text-2xl font-bold text-red-900 mb-4">Featured Campaigns</h2>
//             <p className="text-gray-700">Campaigns will be listed here...</p>
//           </section>
//         );
//       case "about":
//         return (
//           <section className="py-16 px-6">
//             <h2 className="text-2xl font-bold text-red-900 mb-4">About Us</h2>
//             <p className="text-gray-700 max-w-xl">
//               Helping Hands is a student-focused fundraising platform that connects donors with real needs.
//             </p>
//           </section>
//         );
//       case "login":
//         return (
//           <section className="py-16 px-6 max-w-md mx-auto">
//             <h2 className="text-2xl font-bold text-red-900 mb-4">Login</h2>
//             <input type="text" placeholder="Email" className="w-full mb-3 px-4 py-2 border rounded" />
//             <input type="password" placeholder="Password" className="w-full mb-3 px-4 py-2 border rounded" />
//             <button className="bg-red-900 text-white px-6 py-2 rounded w-full hover:bg-red-700">
//               Login
//             </button>
//           </section>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Public Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-red-900">Helping Hands</h1>
//         <div className="flex space-x-6 items-center text-gray-700 font-medium">
//           <button onClick={() => setView("home")} className="hover:text-red-900">Home</button>
//           <button onClick={() => setView("campaigns")} className="hover:text-red-900">Campaigns</button>
//           <button onClick={() => setView("about")} className="hover:text-red-900">About</button>
//           <button onClick={() => setView("login")} className="bg-red-900 text-white px-4 py-1.5 rounded hover:bg-red-700">
//             Login
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="pt-20 px-6">{renderView()}</main>
//     </div>
//   );
// };

// export default LandingPage;