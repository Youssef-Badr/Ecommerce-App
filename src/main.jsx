import { createRoot } from "react-dom/client";
import "flowbite/dist/flowbite.min.js";
// import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'slick-carousel/slick/slick-min.js';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import ConterContextProvider from "./context/CounterContext.jsx";
import UserTokenProvider from "./context/UserToken.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import NumItemContextProvider from "./context/NumCartContext.jsx";
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(

  <NumItemContextProvider>
  <QueryClientProvider client={queryClient}>
  <UserTokenProvider>
    <ConterContextProvider>
      <App />
      <Toaster></Toaster>
      <ReactQueryDevtools initialIsOpen={false} />
    </ConterContextProvider>
  </UserTokenProvider>
  </QueryClientProvider>
  </NumItemContextProvider>
);
