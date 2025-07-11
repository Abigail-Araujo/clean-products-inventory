// Para los select se usa Tom Select
let tomSelectAddInstance;
let tomSelectOrderInstance;

document.addEventListener("DOMContentLoaded", () => {
  tomSelectOrderInstance = new TomSelect("#order-select", {
    create: false,
    controlInput: null,
    placeholder: "Selecciona un orden",
  });
});

// Elementos del DOM
// elementos de la barra de busqueda
const searchInput = document.getElementById("search-input");
// elementos del modal de agregar producto
const displayModalAdd = document.getElementById(
  "display-modal-add-product-btn"
);
const closeModalAdd = document.getElementById("close-modal-add-product-btn");
const addBtn = document.getElementById("add-product-btn");
const modalAdd = document.getElementById("add-product-modal");
const productForm = document.getElementById("add-product-form");
let productName = document.getElementById("name");
let idCategory = document.getElementById("id_category");
let idPresentation = document.getElementById("id_presentation");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let quantityAlert = document.getElementById("quantityAlert");
let description = document.getElementById("description");
// elementos del modal ordenar productos
const orderModal = document.getElementById("order-product-modal");
const openOrderModalBtn = document.getElementById("order-btn");
const closeOrderModalBtn = document.getElementById("close-modal-order-btn");
const orderForm = document.getElementById("order-form");
const orderSelect = document.getElementById("order-select");
let isOrdened = false; // Variable para saber si se ha ordenado
let selectedOrder = "stock-asc"; // valor por defecto
// elementos del modal filtrar productos
const filterCategoryGroup = document.getElementById("filter-category-group");
const filterModal = document.getElementById("filter-product-modal");
const openFilterModalBtn = document.getElementById("filter-btn");
const closeFilterModalBtn = document.getElementById("close-modal-filter-btn");
const filterForm = document.getElementById("filter-form");
const clearFilterBtn = document.getElementById("clear-filter-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");
let filterApplied = false; // Variable para saber si se ha aplicado un filtro
// Variables globales para el estado de filtro y orden
let selectedStock = null;
let selectedCategory = null;
// elementos de la lista de productos
const productList = document.getElementById("product-list");

function buildProductUrl() {
  const params = [];
  if (selectedCategory) params.push(`category=${selectedCategory}`);
  if (selectedStock) params.push(`stock=${selectedStock}`);
  if (selectedOrder) params.push(`order=${selectedOrder}`);
  return "/api/products" + (params.length ? "?" + params.join("&") : "");
}

// Cargar presentaciones al cargar la página
async function loadPresentations() {
  try {
    const response = await axios.get("/api/presentations");
    const presentations = response.data;

    // Agrega las opciones de presentaciones al select
    presentations.forEach((presentation) => {
      const option = document.createElement("option");
      option.value = presentation.id;
      option.textContent = presentation.presentation;
      idPresentation.appendChild(option);
    });

    if (window.tomSelectPresentationInstance) {
      window.tomSelectPresentationInstance.destroy();
    }
    window.tomSelectPresentationInstance = new TomSelect("#id_presentation", {
      create: false,
      hidePlaceholder: true,
      allowEmptyOption: true,
      sortField: { field: "text", direction: "asc" },
      placeholder: "Selecciona una presentación",
      render: {
        no_results: function () {
          return `<div class="no-results py-2 px-4 text-gray-500">No se encontraron resultados</div>`;
        },
      },
    });
  } catch (error) {
    console.error("Error al cargar las presentaciones:", error);
  }
}

loadPresentations();

// carga las categorías al cargar la página
async function loadCategories() {
  try {
    const response = await axios.get("/api/categories");
    const categories = response.data;

    // Agrega las opciones de categorías al select
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.category;
      idCategory.appendChild(option);
    });

    tomSelectAddInstance = new TomSelect("#id_category", {
      create: false,
      hidePlaceholder: true,
      allowEmptyOption: true,
      sortField: { field: "text", direction: "asc" },
      placeholder: "Selecciona una categoría",
      render: {
        no_results: function (data, escape) {
          return `<div class="no-results py-2 px-4 text-gray-500">No se encontraron resultados</div>`;
        },
      },
    });

    // Agregar las categorías al modal de filtro
    categories.forEach((category) => {
      const label = document.createElement("label");
      label.className = "flex items-center cursor-pointer gap-3";
      label.innerHTML = `
        <input type="radio" name="filter-category" value="${category.id}"
          class="sr-only filter-category-radio">
        <span class="relative w-12 h-6 flex items-center bg-gray-300 rounded-full transition-colors duration-300">
          <span class="dot absolute left-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-300"></span>
        </span>
        <span class="text-gray-900">${category.category}</span>
      `;
      filterCategoryGroup.appendChild(label);
    });

    // Radios de categoría
    document
      .querySelectorAll('input[name="filter-category"]')
      .forEach((radio) => {
        radio.addEventListener("click", function (e) {
          if (this.dataset.waschecked === "true") {
            this.checked = false;
            this.dataset.waschecked = "false";
          } else {
            document
              .querySelectorAll('input[name="filter-category"]')
              .forEach((r) => (r.dataset.waschecked = "false"));
            this.dataset.waschecked = "true";
          }
          requestAnimationFrame(updateSwitchDots);
        });
      });
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
}

// Llamar a la función para cargar las categorías al cargar la página
loadCategories();

function stockBgColor(stock) {
  switch (stock) {
    case "Alto":
      return ["text-green-900", "bg-green-200"];
    case "Medio":
      return ["text-orange-500", "bg-orange-300"];
    case "Bajo":
      return ["text-red-700", "bg-red-200"];
    default:
      return ["text-gray-900", "bg-gray-200"];
  }
}

// Función para renderizar la tabla de productos
async function renderProductTable(path) {
  try {
    const response = await axios.get(path);
    const products = response.data;

    // Limpia la tabla
    productList.innerHTML = "";

    if (products.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.textContent = "No se encontraron productos";
      cell.className = "text-center text-gray-500 py-8";
      row.appendChild(cell);
      productList.appendChild(row);
      return;
    }

    // Agrega cada producto como fila
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.className = "product-item";

      const [textClass, bgClass] = stockBgColor(product.stock);

      row.innerHTML = `
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div class="flex items-center">
            <div class="ml-3">
              <p class="product-name text-gray-900 whitespace-no-wrap">${product.name}</p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="product-quantity text-gray-900 whitespace-no-wrap">${product.quantity}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="product-category text-gray-900 whitespace-no-wrap">${product.id_category?.category}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="product-presentation text-gray-900 whitespace-no-wrap">${product.id_presentation?.presentation}</p>
        </td>
        <td class="px-5 py-5 bg-white text-sm border-b border-gray-200">
          <p class="product-price text-gray-900 whitespace-no-wrap">$${product.price}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span class="relative inline-block px-3 py-1 font-semibold ${textClass} leading-tight">
            <span class="absolute inset-0 ${bgClass} opacity-50 rounded-full"></span>
            <span class="product-stock relative">${product.stock}</span>
          </span>
        </td>
      `;
      productList.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    let msg = error.response.data.message || "Error al cargar los productos";
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = msg;
    cell.className = "text-center text-red-500 py-8";
    row.appendChild(cell);
    productList.appendChild(row);
  }
}

// Llamar a la función para renderizar la tabla al cargar la página
renderProductTable(buildProductUrl());

// Event listener barra de búsqueda
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const products = productList.querySelectorAll(".product-item");

  products.forEach((product) => {
    const productName = product
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
});

// funciones para ocultar y mostrar modales
const openModal = (modal) => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const closeModal = (modal) => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
};

displayModalAdd.addEventListener("click", () => {
  openModal(modalAdd);
});

closeModalAdd.addEventListener("click", () => {
  closeModal(modalAdd);

  // Limpiar el formulario al cerrar el modal
  document.getElementById("product-form").reset();

  if (tomSelectAddInstance) {
    tomSelectAddInstance.clear(true);
  }
});

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    name: productName.value,
    id_category: idCategory.value,
    id_presentation: idPresentation.value,
    quantity: Number(quantity.value),
    price: Number(price.value),
    quantityAlert: Number(quantityAlert.value),
    description: description.value,
    // Calcula el stock según la cantidad
    stock:
      Number(quantity.value) <= Number(quantityAlert.value)
        ? "Bajo"
        : Number(quantity.value) <=
          Number(quantityAlert.value) + Number(quantityAlert.value) * 0.5
        ? "Medio"
        : "Alto",
  };

  try {
    await axios.post("/api/products", newProduct);
    await renderProductTable(buildProductUrl()); // Refresca la tabla
    closeModal(modalAdd);
    productForm.reset();
    if (tomSelectAddInstance) {
      tomSelectAddInstance.clear(true);
    }
  } catch (error) {
    alert(`Error al agregar el producto. ${error.response.data.message || ""}`);
    console.error(error);
  }
});

openOrderModalBtn.addEventListener("click", () => {
  openModal(orderModal);
});

const closeOrderModal = () => {
  closeModal(orderModal);

  if (!isOrdened) {
    tomSelectOrderInstance.setValue("stock-asc");
    return;
  }
  tomSelectOrderInstance.setValue(selectedOrder);
};

closeOrderModalBtn.addEventListener("click", () => {
  closeOrderModal();
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const orderValue = orderSelect.value;
  if (orderValue) {
    selectedOrder = orderValue;
    renderProductTable(buildProductUrl());
    isOrdened = true;
    closeOrderModal();
  } else {
    alert("Por favor, selecciona un orden.");
  }
});

// Abrir modal de filtro
openFilterModalBtn.addEventListener("click", () => {
  openModal(filterModal);
});

// Cerrar modal de filtro (sin limpiar selección)
closeFilterModalBtn.addEventListener("click", () => {
  closeModal(filterModal);
  if (!filterApplied) {
    removeFilter(); // Limpia los filtros si no se aplicó ninguno
  }
});

// Aplicar filtro
applyFilterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const stockRadios = document.querySelectorAll('input[name="filter-stock"]');
  const categoryRadios = document.querySelectorAll(
    'input[name="filter-category"]'
  );

  const isStockChecked = Array.from(stockRadios).find((radio) => radio.checked);
  const isCategoryChecked = Array.from(categoryRadios).find(
    (radio) => radio.checked
  );

  selectedStock = isStockChecked ? isStockChecked.value : null;
  selectedCategory = isCategoryChecked ? isCategoryChecked.value : null;

  filterApplied = !!(selectedStock || selectedCategory);

  renderProductTable(buildProductUrl());
  closeModal(filterModal);
});

// Botón "Quitar filtro"
const removeFilter = () => {
  document.querySelectorAll('input[name="filter-stock"]').forEach((radio) => {
    radio.checked = false;
    radio.dataset.waschecked = "false";
  });
  document
    .querySelectorAll('input[name="filter-category"]')
    .forEach((radio) => {
      radio.checked = false;
      radio.dataset.waschecked = "false";
    });
  requestAnimationFrame(updateSwitchDots);
};

clearFilterBtn.addEventListener("click", () => {
  removeFilter();
  selectedStock = null;
  selectedCategory = null;
  filterApplied = false;
  renderProductTable(buildProductUrl());
  closeModal(filterModal);
});

// Radios de stock
document.querySelectorAll('input[name="filter-stock"]').forEach((radio) => {
  radio.addEventListener("click", function (e) {
    if (this.dataset.waschecked === "true") {
      this.checked = false;
      this.dataset.waschecked = "false";
    } else {
      document
        .querySelectorAll('input[name="filter-stock"]')
        .forEach((r) => (r.dataset.waschecked = "false"));
      this.dataset.waschecked = "true";
    }
    requestAnimationFrame(updateSwitchDots);
  });
});

function updateSwitchDots() {
  // Quita la clase a todos los dots y a sus padres
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("dot-checked");
    dot.parentElement.classList.remove("bg-blue-500");
    dot.parentElement.classList.add("bg-gray-300");
  });

  // Agrega la clase solo a los seleccionados (stock y categoría)
  document
    .querySelectorAll(
      'input[name="filter-stock"]:checked, input[name="filter-category"]:checked'
    )
    .forEach((radio) => {
      const label = radio.closest("label");
      if (label) {
        const dot = label.querySelector(".dot");
        if (dot) {
          dot.classList.add("dot-checked");
          dot.parentElement.classList.remove("bg-gray-300");
          dot.parentElement.classList.add("bg-blue-500");
        }
      }
    });
}
