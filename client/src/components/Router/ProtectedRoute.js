// import React from "react"
// import { Route, Navigate } from "react-router-dom"
// import { useSelector } from "react-redux"

// const ProtectedRoute = ({ element: Component, ...props }) => {
//     const isLoggedIn = localStorage.getItem('token')
//     console.log(isLoggedIn);

//     return (
//         <Route {...props}
//             element={(props) => (
//                 isLoggedIn ?
//                     < Component {...props} />
//                     : <Navigate to='/login' />

//             )}
//         />
//     )
// }

// export default ProtectedRoute