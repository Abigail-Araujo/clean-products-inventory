const navbar = document.querySelector("#navbar");

if (navbar) {
  // Detecta la ruta actual
  const path = window.location.pathname;

  // Nav para login y signup
  if (path == "/" || path === "/login" || path === "/login/" || path === "/signup" || path === "/signup/") {
    navbar.innerHTML = `
      <nav class="bg-blue-700 p-4 text-white flex justify-between items-center shadow">
        <a href="/" class="font-medium text-lg hover:text-gray-200">TodoLimpio</a>
        <ul class="flex space-x-4">
          <li><a href="/login" class="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</a></li>
          <li><a href="/signup" class="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Registro</a></li>
        </ul>
      </nav>
    `;
  }

                        //   <li class="text-gray-600 md:mr-5 hover:text-blue-600"><a href="#">Support</a></li>
                        // <li class="text-gray-600 md:mr-5 hover:text-blue-600">
                        //     <button
                        //         class="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">Login</button>
                        // </li>

//   // Nav para home y otras páginas protegidas
//   else if (
//     path === "/home" || path === "/home/" ||
//     path === "/stock" || path === "/stock/" ||
//     path === "/entries" || path === "/entries/" ||
//     path === "/exits" || path === "/exits/" ||
//     path === "/orders" || path === "/orders/" ||
//     path === "/configuration" || path === "/configuration/"
//   ) {
//     navbar.innerHTML = `
//       <nav class="bg-blue-700 p-4 text-white flex justify-between items-center shadow">
//         <a href="/home" class="font-bold text-lg hover:text-gray-200">TodoLimpio</a>
//         <ul class="flex space-x-4">
//           <li><a href="/home" class="hover:text-gray-200">Inicio</a></li>
//           <li><a href="/stock" class="hover:text-gray-200">Stock</a></li>
//           <li><a href="/entries" class="hover:text-gray-200">Entradas</a></li>
//           <li><a href="/exits" class="hover:text-gray-200">Salidas</a></li>
//           <li><a href="/orders" class="hover:text-gray-200">Órdenes</a></li>
//           <li><a href="/configuration" class="hover:text-gray-200">Configuración</a></li>
//           <li><a href="/login" class="hover:text-gray-200">Salir</a></li>
//         </ul>
//       </nav>
//     `;
//   }
//   // Nav por defecto (puedes personalizarlo)
//   else {
//     navbar.innerHTML = `
//       <nav class="bg-blue-700 p-4 text-white flex justify-between items-center shadow">
//         <a href="/" class="font-bold text-lg hover:text-gray-200">TodoLimpio</a>
//       </nav>
//     `;
//   }
}