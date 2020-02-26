import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./bookDetails";

function BookList(props) {
  const [selected, setSelected] = useState(null);
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      return (
        <div>
          <p>Loading Books...</p>
        </div>
      );
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={e => {
              setSelected(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul>{displayBooks()}</ul>
      {/* {console.log(selected)} */}
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
