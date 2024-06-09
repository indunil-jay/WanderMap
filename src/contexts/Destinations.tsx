import { createContext, useContext, useEffect, useState } from "react";

export interface IDestination {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

const URL = "http://localhost:8000";

type Props = {
  children: React.ReactNode;
};

interface IDestinationContext {
  destinations: IDestination[];
  isLoading: boolean;
  currentDestination: IDestination | undefined;
  getDestination: (id: string) => void;
}

const DestinationContext = createContext<IDestinationContext | undefined>(
  undefined
);

const DestinationsProvider = ({ children }: Props) => {
  const [destinations, setDestinations] = useState<Array<IDestination>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDestination, setCurrentDestination] = useState<
    IDestination | undefined
  >();

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

  const getDestination = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/destinations/${id}`);
      const data: IDestination = await response.json();
      setCurrentDestination(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DestinationContext.Provider
      value={{ destinations, isLoading, currentDestination, getDestination }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

const useDestination = () => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error(
      "DestinationContext was used outside the DestinationProvider."
    );
  }
  return context;
};

export { DestinationsProvider, useDestination };
