import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AppGuide from "./pages/AppGuide";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import DestinationList from "./components/DestinationList";
import CountriesList from "./components/CountriesList";
import DestinationDetails from "./components/DestinationDetails";
import Form from "./components/Form";
import { DestinationsProvider } from "./contexts/Destinations";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { AuthProvider } from "./contexts/Auth";
polyfillCountryFlagEmojis(
  "var(--font-montserrat)",
  "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
);

const App = () => {
  return (
    <AuthProvider>
      <DestinationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="destinations" replace />} />
              <Route path="destinations" element={<DestinationList />} />
              <Route path="destinations/:id" element={<DestinationDetails />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/how-to-use" element={<AppGuide />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DestinationsProvider>
    </AuthProvider>
  );
};

export default App;
