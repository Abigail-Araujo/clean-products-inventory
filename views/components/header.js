const header = document.querySelector("#header");

if (header) {
  // Detecta la ruta actual
  const path = window.location.pathname;

  if (path === "/login" || path === "/login/") {
    header.innerHTML = `
            <div
                class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
                <a href="/" class="flex items-center whitespace-nowrap text-2xl font-black">
                    <span class="mr-2 text-4xl text-blue-600">
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
                    class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
                    <ul class="flex flex-col justify-center items-center space-y-2 md:w-auto md:ml-auto md:flex-row md:space-y-0">
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="" class="inline-block mx-auto w-[90vw] md:w-auto text-center py-2.5 px-5 text-md font-medium text-blue-600 focus:outline-none bg-white rounded-lg border-2 border-blue-700 hover:text-blue-700 focus:z-10 dark:border-blue-600 dark:hover:bg-sky-200">
                            Iniciar Sesión
                        </a></li>
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="/signup/" class="inline-block mx-auto w-[90vw] md:w-auto text-center text-white bg-blue-700 border-2 border-blue-600 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                            Registro
                        </a></li>
                    </ul>
                </nav>
            </div>
        `;
  } else if (path === "/signup" || path === "/signup/") {
    header.innerHTML = `
            <div
                class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
                <a href="/" class="flex items-center whitespace-nowrap text-2xl font-black">
                    <span class="mr-2 text-4xl text-blue-600">
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
                    class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
                    <ul class="flex flex-col justify-center items-center space-y-2 md:w-auto md:ml-auto md:flex-row md:space-y-0">
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="/login/" class="inline-block mx-auto w-[90vw] md:w-auto text-center py-2.5 px-5 text-md font-medium text-blue-600 focus:outline-none bg-white rounded-lg border-2 border-blue-700 hover:text-blue-700 focus:z-10 dark:border-blue-600 dark:hover:bg-sky-200">
                            Iniciar Sesión
                        </a></li>
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="" class="inline-block mx-auto w-[90vw] md:w-auto text-center text-white bg-blue-700 border-2 border-blue-600 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                            Registro
                        </a></li>
                    </ul>
                </nav>
            </div>
        `;
  }
  else if(path == "/"){
        header.innerHTML = `
            <div
                class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
                <a href="" class="flex items-center whitespace-nowrap text-2xl font-black">
                    <span class="mr-2 text-4xl text-blue-600">
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
                    class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
                    <ul class="flex flex-col justify-center items-center space-y-2 md:w-auto md:ml-auto md:flex-row md:space-y-0">
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="/login/" class="inline-block mx-auto w-[90vw] md:w-auto text-center py-2.5 px-5 text-md font-medium text-blue-600 focus:outline-none bg-white rounded-lg border-2 border-blue-700 hover:text-blue-700 focus:z-10 dark:border-blue-600 dark:hover:bg-sky-200">
                            Iniciar Sesión
                        </a></li>
                        <li class="md:mr-5 hover:text-blue-600">
                        <a href="/signup/" class="inline-block mx-auto w-[90vw] md:w-auto text-center text-white bg-blue-700 border-2 border-blue-600 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                            Registro
                        </a></li>
                    </ul>
                </nav>
            </div>
        `;
  }
}
