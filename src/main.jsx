import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Routes';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
import { Provider } from 'react-redux';
import store from './redux/store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
