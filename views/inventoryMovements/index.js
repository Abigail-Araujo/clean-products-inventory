// Para los select se usa Tom Select
let tomSelectTypeInstance;
let tomSelectProductInstance;
let tomSelectReasonInstance;
// let tomSelectOrderInstance;
let tomSelectAddTypeInstance;

document.addEventListener("DOMContentLoaded", () => {
  // Tom Select para filtro de tipo de movimiento
  tomSelectTypeInstance = new TomSelect("#movement-type-filter", {
    create: false,
    allowEmptyOption: true,
    placeholder: "Filtrar por tipo",
    render: {
      no_results: function () {
        return `<div class="no-results py-2 px-4 text-gray-500">No se encontraron resultados</div>`;
      },
    },
    controlInput: null,
  });

  // Tom Select para tipo en agregar movimiento
  tomSelectAddTypeInstance = new TomSelect("#movement-type", {
    create: false,
    allowEmptyOption: true,
    placeholder: "Selecciona tipo",
    sortField: { field: "text", direction: "asc" },
  });

  // tomSelectOrderInstance = new TomSelect("#order-movement-select", {
  //   create: false,
  //   allowEmptyOption: true,
  //   placeholder: "Selecciona un orden",
  // });

  // Tom Select para agregar movimiento
  tomSelectProductInstance = new TomSelect("#movement-product", {
    create: false,
    allowEmptyOption: true,
    placeholder: "Selecciona un producto",
    sortField: { field: "text", direction: "asc" },
  });

  tomSelectReasonInstance = new TomSelect("#movement-reason", {
    create: false,
    allowEmptyOption: true,
    placeholder: "Selecciona un motivo",
    sortField: { field: "text", direction: "asc" },
  });

  loadProducts();
  loadReasons();
  renderMovementTable("/api/inventoryMovements");
});

// Elementos del DOM
const searchInput = document.getElementById("search-movement-input");
const typeFilter = document.getElementById("movement-type-filter");
const displayModalAdd = document.getElementById(
  "display-modal-add-movement-btn"
);
const closeModalAdd = document.getElementById("close-modal-add-movement-btn");
const addBtn = document.getElementById("add-movement-btn");
const modalAdd = document.getElementById("add-movement-modal");
const movementForm = document.getElementById("add-movement-form");
const movementType = document.getElementById("movement-type");
const movementProduct = document.getElementById("movement-product");
const movementReason = document.getElementById("movement-reason");
const movementQuantity = document.getElementById("movement-quantity");
const movementDescription = document.getElementById("movement-description");
const movementList = document.getElementById("movement-list");

// Modal ordenar
//const orderModal = document.getElementById("order-movement-modal");
// const openOrderModalBtn = document.getElementById("order-movement-btn");
// const closeOrderModalBtn = document.getElementById(
//   "close-modal-order-movement-btn"
// );
// const orderForm = document.getElementById("order-movement-form");
// const orderSelect = document.getElementById("order-movement-select");
// let selectedOrder = "date-desc";

// Función para construir la URL con filtros
// function buildMovementUrl() {
//   const params = [];
//   const search = searchInput.value.trim();
//   if (search) params.push(`search=${encodeURIComponent(search)}`);
//   if (selectedOrder) params.push(`order=${selectedOrder}`);
//   return (
//     "/api/inventoryMovements" + (params.length ? "?" + params.join("&") : "")
//   );
// }

// Cargar productos en el select
async function loadProducts() {
  try {
    const response = await axios.get("/api/products");
    const products = response.data;
    movementProduct.innerHTML = `<option value="" hidden>Selecciona un producto</option>`;
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent =
        product.name + " (" + product.id_presentation?.presentation + ")";
      movementProduct.appendChild(option);
    });
    tomSelectProductInstance.clearOptions();
    tomSelectProductInstance.addOptions([...movementProduct.options]);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Cargar motivos en el select
async function loadReasons() {
  try {
    const response = await axios.get("/api/movementReasons");
    const reasons = response.data;
    movementReason.innerHTML = `<option value="" hidden>Selecciona un motivo</option>`;
    reasons.forEach((reason) => {
      const option = document.createElement("option");
      option.value = reason.id;
      option.className = `${reason.type}`;
      option.textContent = reason.reason + " (" + reason.type + ")";
      movementReason.appendChild(option);
    });
    tomSelectReasonInstance.clearOptions();
    tomSelectReasonInstance.addOptions([...movementReason.options]);
  } catch (error) {
    console.error("Error al cargar motivos:", error);
  }
}

// Renderizar la tabla de movimientos
async function renderMovementTable(path) {
  try {
    const response = await axios.get(path);
    const movements = response.data;
    movementList.innerHTML = "";

    if (movements.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 7;
      cell.textContent = "No se encontraron movimientos";
      cell.className = "text-center text-gray-500 py-8";
      row.appendChild(cell);
      movementList.appendChild(row);
      return;
    }

    movements.forEach((movement) => {
      const row = document.createElement("tr");
      row.className = `${movement.id_reason?.type} movement-item bg-white hover:bg-gray-100`;
      row.innerHTML = `
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          <span class="inline-block px-3 py-1 font-semibold ${
            movement.id_reason?.type === "entrada"
              ? "text-green-900 bg-green-200"
              : "text-red-700 bg-red-200"
          } rounded-full">${
        movement.id_reason?.type === "entrada" ? "Entrada" : "Salida"
      }</span>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${movement.id_product?.name || ""}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${movement.id_reason?.reason || ""}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${movement.quantity}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${new Date(movement.createdAt).toLocaleString()}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${movement.id_user?.name}
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          ${movement.description || ""}
        </td>
      `;
      movementList.appendChild(row);
    });
    // Filtrar al cargar
    filterMovements();
  } catch (error) {
    console.error(error);
    let msg =
      error.response?.data?.message || "Error al cargar los movimientos";
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.textContent = msg;
    cell.className = "text-center text-red-500 py-8";
    row.appendChild(cell);
    movementList.appendChild(row);
  }
}

// Filtrar movimientos por tipo y búsqueda
function filterMovements() {
  const selectedType = typeFilter.value;
  const searchTerm = searchInput.value.toLowerCase().trim();
  const rows = movementList.querySelectorAll("tr.movement-item");

  rows.forEach((row) => {
    const productName = row.children[1]?.textContent.toLowerCase();
    const matchesType =
      !selectedType ||
      selectedType === "todos" ||
      row.classList.contains(selectedType);
    const matchesSearch = productName.includes(searchTerm);

    // Mostrar solo si cumple ambos filtros
    if (matchesType && matchesSearch) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Evento de cambio en el filtro de tipo
typeFilter.addEventListener("change", filterMovements);

// Evento de búsqueda
searchInput.addEventListener("input", filterMovements);

// Modal agregar movimiento
displayModalAdd.addEventListener("click", () => {
  modalAdd.classList.remove("hidden");
  modalAdd.classList.add("flex");
  // Al cargar el modal, inhabilita el select de motivo si no hay tipo seleccionado
  if (!movementType.value) {
    movementReason.disabled = true;
    tomSelectReasonInstance.disable();
  }
});

closeModalAdd.addEventListener("click", () => {
  modalAdd.classList.remove("flex");
  modalAdd.classList.add("hidden");
  movementForm.reset();
  tomSelectProductInstance.clear(true);
  tomSelectReasonInstance.clear(true);
  tomSelectAddTypeInstance.clear(true);
});

// Mostrar motivos según tipo seleccionado en el modal
movementType.addEventListener("change", () => {
  const selectedType = movementType.value;

  // Limpiar el select de motivo al cambiar tipo
  tomSelectReasonInstance.clear(true);

  // Si no se selecciona tipo, inhabilita el select de motivo
  if (!selectedType) {
    movementReason.disabled = true;
    tomSelectReasonInstance.disable();
    tomSelectReasonInstance.clear(true);
    return;
  }

  movementReason.disabled = false;
  tomSelectReasonInstance.enable();

  // Filtra las opciones de motivo según el tipo seleccionado
  Array.from(movementReason.options).forEach((option) => {
    if (!option.value) {
      option.hidden = false; // Mantener la opción vacía visible
      return;
    }
    option.hidden = option.className !== selectedType;
  });

  // Actualiza Tom Select para mostrar solo los motivos válidos
  tomSelectReasonInstance.clearOptions();
  tomSelectReasonInstance.addOptions(
    Array.from(movementReason.options).filter((opt) => !opt.hidden)
  );
});

// Guardar movimiento
movementForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newMovement = {
    type: movementType.value,
    id_product: movementProduct.value,
    id_reason: movementReason.value,
    quantity: Number(movementQuantity.value),
    description: movementDescription.value,
    // El usuario se asigna en backend por sesión
  };
  try {
    await axios.post("/api/inventoryMovements", newMovement);

    renderMovementTable("/api/inventoryMovements");
    modalAdd.classList.remove("flex");
    modalAdd.classList.add("hidden");
    movementForm.reset();
    tomSelectProductInstance.clear(true);
    tomSelectReasonInstance.clear(true);
    tomSelectAddTypeInstance.clear(true);
  } catch (error) {
    alert(
      `Error al registrar el movimiento. ${error.response?.data?.message || ""}`
    );
    console.error(error);
  }
});

// Modal ordenar
// openOrderModalBtn.addEventListener("click", () => {
//   orderModal.classList.remove("hidden");
//   orderModal.classList.add("flex");
// });

// closeOrderModalBtn.addEventListener("click", () => {
//   orderModal.classList.remove("flex");
//   orderModal.classList.add("hidden");
// });

// orderForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const orderValue = orderSelect.value;
//   if (orderValue) {
//     selectedOrder = orderValue;
//     renderMovementTable(buildMovementUrl());
//     orderModal.classList.remove("flex");
//     orderModal.classList.add("hidden");
//   } else {
//     alert("Por favor, selecciona un orden.");
//   }
// });
