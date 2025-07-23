// This file contains auxiliary functions for sort

const stockOrder = { bajo: 1, medio: 2, alto: 3 };

const sortAscending = (result, key) => {
  if (key === "stock") {
    return result.sort((a, b) => stockOrder[a[key]?.toLowerCase()] - stockOrder[b[key]?.toLowerCase()]);
  }
  if (key === "category") {
    return result.sort((a, b) =>
      a.id_category.category.localeCompare(b.id_category.category, "es", {
        sensitivity: "base",
      })
    );
  }
  if (typeof result[0][key] === "string") {
    return result.sort((a, b) =>
      a[key].localeCompare(b[key], "es", { sensitivity: "base" })
    );
  }
  return result.sort((a, b) => a[key] - b[key]);
};

const sortDescending = (result, key) => {
  if (key === "stock") {
    return result.sort((a, b) => stockOrder[b[key]?.toLowerCase()] - stockOrder[a[key]?.toLowerCase()]);
  }
  if (key === "category") {
    return result.sort((a, b) =>
      b.id_category.category.localeCompare(a.id_category.category, "es", {
        sensitivity: "base",
      })
    );
  }
  if (typeof result[0][key] === "string") {
    return result.sort((a, b) =>
      b[key].localeCompare(a[key], "es", { sensitivity: "base" })
    );
  }
  return result.sort((a, b) => b[key] - a[key]);
};

module.exports = {
  sortAscending: sortAscending,
  sortDescending: sortDescending,
};
