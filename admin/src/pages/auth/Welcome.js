// import { useSelector } from "react-redux";
// import { selectCurrentUser, selectCurrentToken } from "./authSlice";
// import { Link } from "react-router-dom";

// import React from "react";

// const Welcome = () => {
//   const user = useSelector(selectCurrentUser);
//   const token = useSelector(selectCurrentToken);

//   const welcome = user ? `Welcome ${user.name}` : `Welcome Guest`;
//   const tokenAbbr = `${token.slice(0, 4)}...`;

//   const content = (
//     <section className="welcome">
//       <h1>{welcome}</h1>
//       <p>Your token is {tokenAbbr}</p>
//       <p>
//         <Link to="/">Back to Home</Link>
//       </p>
//     </section>
//   );

//   return  content;
// };

// export default Welcome;
