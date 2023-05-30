import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

function AdminAuth() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      const data = JSON.parse(localStorage.getItem("user-info"));
      const decodeToken = jwt_decode(data.token);
      const role =
        decodeToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      // console.log(decodeToken);
      if (decodeToken.exp < Date.now() / 1000) {// change this
        localStorage.removeItem("user-info");
        setAuth(false);
        navigate("/Login");
      } else if (role != 1 && role != 2) {
        setAuth(false);
        navigate("/Login");
      } else setAuth(true);
    } else navigate("/Login");
  });

  return auth;
  // <div className=" bg-red-500 absolute w-screen h-screen z-40 "></div>
}

export default AdminAuth;
//   <div className="fixed pin flex items-center">
//     <div className="fixed pin bg-black opacity-75 z-10"></div>

//     <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8">
//       <div className="shadow-lg bg-white rounded-lg p-8">
//         <div className="flex justify-end mb-6">
//           <button>
//             <span className="mr-2">Close</span>
//             <span>
//               <i className="fa fa-times"></i>
//             </span>
//           </button>
//           <h1 className="text-center text-2xl text-green-dark">Login</h1>
//           <form className="pt-6 pb-2 my-2">
//             <div className="mb-4">
//               <label className="block text-sm font-bold mb-2" htmlFor="email">
//                 Email Address
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
//                 id="email"
//                 type="text"
//                 placeholder="Email Address"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-bold mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//               />
//             </div>
//             <div className="block md:flex items-center justify-between">
//               <div>
//                 <button
//                   className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded border-b-4 border-green-darkest"
//                   type="button"
//                 >
//                   Sign In
//                 </button>
//               </div>

//               <div className="mt-4 md:mt-0">
//                 <a href="#" className="text-green no-underline">
//                   Forget Password?
//                 </a>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
