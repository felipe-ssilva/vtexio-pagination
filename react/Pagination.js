import React from "react";
import { path } from "ramda";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";

const Pagination = () => {
  const { searchQuery, maxItemsPerPage, page } = useSearchPage();

  // total number of products
  const totalNumberProducts = path(
    ["data", "productSearch", "recordsFiltered"],
    searchQuery
  );

  // total number of pages
  const totalNumberOfPages = Math.ceil(totalNumberProducts / maxItemsPerPage);

  // get query data
  const queryData = {
    query: path(["variables", "query"], searchQuery),
    map: path(["variables", "map"], searchQuery),
    order: path(["variables", "orderBy"], searchQuery),
    priceRange: path(["variables", "selectedFacets"], searchQuery)?.find(
      (facet) => facet.key === "priceRange"
    )?.value,
  };

  // create strings for parameters
  const map =
    queryData.map !== "c" &&
    queryData.map !== "c,c" &&
    queryData.map !== "c,c,c"
      ? `&map=${queryData.map}`
      : "";
  const order =
    queryData.order !== "OrderByReleaseDateDESC"
      ? `&order=${queryData.order}`
      : "";
  const priceRange =
    queryData.priceRange === undefined
      ? ""
      : `&priceRange=${queryData.priceRange}`;

  // Create an array with n elements based on the integer value of totalNumberOfPages
  const pages = [];
  for (let i = 0; i < totalNumberOfPages; i++) {
    pages.push(i + 1);
  }

  // Create a new array with the pages that will be displayed based on the current page showing 3 after and 10 before
  const pagesToShow = pages.filter(
    (thePage) =>
      thePage >= page - 3 &&
      thePage <= page + 10 &&
      thePage <= totalNumberOfPages
  );

  // Insert '»" at the end if there is a next page
  if (page < totalNumberOfPages) {
    pagesToShow.push("»");
  }

  // Insert "«" at the beginning if there is a previous page
  if (page > 1) {
    pagesToShow.unshift("«");
  }

  // Insert last page if it is not in the array
  if (pagesToShow[pagesToShow.length - 1] !== totalNumberOfPages) {
    pagesToShow.push("Última");
  }

  // Insert first page if it is not in the array
  if (pagesToShow[0] !== 1) {
    pagesToShow.unshift("Primeira");
  }

  return (
    <div
      className='flex flex-wrap justify-center flex-column items-center mt7'
    >
      <div
        id="total"
        className='flex justify-center ma5 flex-wrap'
      >
        {pagesToShow.map((thePage) =>
          page == thePage ? (
            <>
              <span
                key={thePage}
                className='inline-block bg-black-20 br2 pa4 ma2 black self-start'
              >
                {thePage}
              </span>
            </>
          ) : (
            <>
              <a
                key={thePage}
                className='no-underline inline-block bg-black-10 br2 pa4 ma2 near-black self-start hover-bg-black-20'
                href={`/${queryData.query}?page=${
                  thePage !== "Primeira" &&
                  thePage !== "Última" &&
                  thePage !== "»" &&
                  thePage !== "«"
                    ? thePage
                    : thePage == "Primeira"
                    ? 1
                    : thePage == "Última"
                    ? totalNumberOfPages
                    : thePage == "«"
                    ? page - 1
                    : page + 1
                }${map}${order}${priceRange}`.trim()}
                title={`Ir para ${
                  thePage != "Primeira" &&
                  thePage != "Última" &&
                  thePage != "»" &&
                  thePage != "«"
                    ? `Página ${thePage}`
                    : thePage == "Primeira"
                    ? "Primeira Página"
                    : thePage == "Última"
                    ? "Última Página"
                    : thePage == "«"
                    ? "Página Anterior"
                    : "Próxima Página"
                }`}
              >
                {thePage}
              </a>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;