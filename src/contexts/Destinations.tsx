import { createContext, useContext, useEffect, useState } from "react";

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

const URL = "http://localhost:8000";

type Props = {
  children: React.ReactNode;
};

interface IDestinationContext {
  destinations: IDestination[];
  isLoading: boolean;
}

const DestinationContext = createContext<IDestinationContext | undefined>(
  undefined
);

const DestinationsProvider = ({ children }: Props) => {
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
    <DestinationContext.Provider value={{ destinations, isLoading }}>
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
