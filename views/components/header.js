const header = document.querySelector("#header");

if (header) {
  // Detecta la ruta actual
  const path = window.location.pathname;

  if (path === "/login" || path === "/login/") {
    header.innerHTML = `
      <div class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" class="inline-flex items-center whitespace-nowrap text-2xl font-black mb-2 self-start">
          <span class="mr-2">
            <img class="h-auto md:w-40 lg:w-32 w-8" src="/img/logo.png" alt="TodoLimpio Logo">
          </span>
          <span class="text-blue-700">TodoLimpio</span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
          <span class="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation"
          class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row">
          <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li class="md:mr-5">
              <a href="" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-blue-700 bg-white border-blue-700 hover:text-blue-700 hover:bg-sky-200 focus:outline-none">
                Iniciar Sesión
              </a>
            </li>
            <li class="md:mr-5">
              <a href="/signup/" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:outline-none">
                Registro
              </a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  } else if (path === "/signup" || path === "/signup/") {
    header.innerHTML = `
      <div class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" class="inline-flex items-center whitespace-nowrap text-2xl font-black mb-2 self-start">
          <span class="mr-2">
            <img class="h-auto md:w-40 lg:w-32 w-8" src="/img/logo.png" alt="TodoLimpio Logo">
          </span>
          <span class="text-blue-700">TodoLimpio</span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
          <span class="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation"
          class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row">
          <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li class="md:mr-5">
              <a href="/login/" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-blue-700 bg-white border-blue-700 hover:text-blue-700 hover:bg-sky-200 focus:outline-none">
                Iniciar Sesión
              </a>
            </li>
            <li class="md:mr-5">
              <a href="" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:outline-none">
                Registro
              </a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  } else if (path == "/") {
    header.innerHTML = `
      <div class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" class="inline-flex items-center whitespace-nowrap text-2xl font-black mb-2 self-start">
          <span class="mr-2">
            <img class="h-auto md:w-40 lg:w-32 w-8" src="/img/logo.png" alt="TodoLimpio Logo">
          </span>
          <span class="text-blue-700">TodoLimpio</span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
          <span class="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation"
          class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row">
          <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li class="md:mr-5">
              <a href="/login/" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-blue-700 bg-white border-blue-700 hover:text-blue-700 hover:bg-sky-200 focus:outline-none">
                Iniciar Sesión
              </a>
            </li>
            <li class="md:mr-5">
              <a href="/signup/" class="inline-block w-[90vw] md:w-auto text-center px-5 py-2.5 text-md font-medium rounded-xl border-2 text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:outline-none">
                Registro
              </a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  } else {
    // Header para usuarios autenticados
    header.innerHTML = `
      <div class="relative flex flex-col overflow-hidden px-4 py-4">
        <a href="/" class="inline-flex items-center whitespace-nowrap text-2xl font-black mb-2 self-start">
          <span class="mr-2">
            <img class="h-auto w-8" src="/img/logo.png" alt="TodoLimpio Logo">
          </span>
          <span class="text-blue-700">TodoLimpio</span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-7 cursor-pointer" for="navbar-open">
          <span class="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation"
          class="peer-checked:mt-8 peer-checked:max-h-[1000px] flex max-h-0 w-full flex-col items-center overflow-hidden transition-all">
          <ul class="flex flex-col items-center space-y-4 w-full">
            <li class="w-full">
              <a href="/stock/" class="block w-full text-center px-5 py-4 text-lg font-medium rounded-2xl border-2 border-blue-700 text-blue-700 bg-white hover:bg-blue-50 transition">
                Stock
              </a>
            </li>
            <li class="w-full">
              <a href="/inventoryMovements/" class="block w-full text-center px-5 py-4 text-lg font-medium rounded-2xl border-2 border-blue-700 text-blue-700 bg-white hover:bg-blue-50 transition">
                Movimientos
              </a>
            </li>
            <li class="w-full">
              <button id="logout-btn" class="block w-full text-center px-5 py-4 text-lg font-medium rounded-2xl bg-blue-700 text-white hover:bg-blue-800 transition cursor-pointer">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    `;
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await axios.get("/api/logout");
          window.location.href = "/";
        } catch (error) {
          alert("Error al cerrar sesión");
          console.error(error);
        }
      });
    }
  }
}
