import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AppGuide from "./pages/AppGuide";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import DestinationList from "./components/DestinationList";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";

const URL = "http://localhost:8000";

export interface IDestination {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

const App = () => {
  const [destinations, setDestinations] = useState<Array<IDestination>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/destinations`);
        const data: IDestination[] = await response.json();
        setDestinations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={
              <DestinationList
                destinations={destinations}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="destinations"
            element={
              <DestinationList
                destinations={destinations}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="countries"
            element={
              <CountriesList
                destinations={destinations}
                isLoading={isLoading}
              />
            }
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/how-to-use" element={<AppGuide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
