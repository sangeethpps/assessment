import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SurveyPage from "./SurveyPage";
import ThanksPage from "./ThanksPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/survey",
        element: <SurveyPage />,
    },
    {
        path: "/thanks",
        element: <ThanksPage />,
    },
]);

root.render(
  <React.StrictMode>
      <div className={'row'}>
          <div className={'col-md-12'}>
              <div className={'container-fluid px-0'}>
                  <div className={'shadow p-3 mb-5 bg-body-tertiary rounded'}>
                      <h4 className={'text-center mb-5'}> Customer Survey Page</h4>
                        <RouterProvider router={router} />
                  </div>
              </div>
          </div>
      </div>

  </React.StrictMode>
);
reportWebVitals();
