import React from "react";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, i) => {
        return (
          <button key={i} onClick={() => setCurrentPage(page)}>
            {page}{" "}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

// import React, { useState } from "react";

// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//   const [pageNum, setPageNum] = useState(1);
//   const totalPages = Math.ceil(totalPosts / postsPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <ul className="pagination">
//         <li onClick={() => {
//             if (pageNum > 1) {
//               paginate(pageNum - 1);
//               setPageNum(pageNum - 1);
//             }
//           }}
//           className="previousBtn"
//         >
//           Previous
//         </li>
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <a
//               style={{ color: pageNum === number ? "red" : "black" }}
//               onClick={() => {
//                 paginate(number);
//                 setPageNum(number);
//               }}
//               className="page-link"
//             >
//               {number}
//             </a>
//           </li>
//         ))}
//         <li
//           onClick={() => {
//             if (pageNum < totalPages) {
//               paginate(pageNum + 1);
//               setPageNum(pageNum + 1);
//             }
//           }}
//           className="nextBtn"
//         >
//           Next
//         </li>
//       </ul>
//     </>
//   );
// };
// export default Pagination;
