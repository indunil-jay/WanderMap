import { createContext, useContext, useEffect, useReducer } from "react";

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
  id: string;
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
  createDestination: (destination: Partial<IDestination>) => void;
  deleteDestination: (id: string) => void;
}

interface IState {
  isLoading: boolean;
  error: string | null;
  destinations: IDestination[];
  currentDestination: IDestination | undefined;
}

const initialState: IState = {
  destinations: [],
  isLoading: false,
  currentDestination: undefined,
  error: "",
};

type Action =
  | { type: "loading" }
  | { type: "rejected"; payload: string }
  | { type: "destinations/loaded"; payload: IDestination[] }
  | { type: "destination/loaded"; payload: IDestination }
  | { type: "destination/created"; payload: IDestination }
  | { type: "destination/deleted"; payload: string };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "destinations/loaded":
      return {
        ...state,
        isLoading: false,
        destinations: action.payload,
      };

    case "destination/loaded":
      return {
        ...state,
        isLoading: false,
        currentDestination: action.payload,
      };

    case "destination/created":
      return {
        ...state,
        isLoading: false,
        destinations: [...state.destinations, action.payload],
      };
    case "destination/deleted":
      return {
        ...state,
        isLoading: false,
        destinations: state.destinations.filter(
          (destination) => destination.id !== action.payload
        ),
      };

    default:
      throw new Error(`Unknown action ${action}`);
  }
};

const DestinationContext = createContext<IDestinationContext | undefined>(
  undefined
);

const DestinationsProvider = ({ children }: Props) => {
  const [{ destinations, isLoading, currentDestination }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${URL}/destinations`);
        const data: IDestination[] = await response.json();
        dispatch({ type: "destinations/loaded", payload: data });
      } catch (error) {
        const typedError = error as Error;
        dispatch({ type: "rejected", payload: typedError.message });
      }
    };
    fetchDestinations();
  }, []);

  const getDestination = async (id: string) => {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${URL}/destinations/${id}`);
      const data: IDestination = await response.json();
      dispatch({ type: "destination/loaded", payload: data });
    } catch (error) {
      const typedError = error as Error;
      dispatch({ type: "rejected", payload: typedError.message });
    }
  };

  const createDestination = async (destination: Partial<IDestination>) => {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${URL}/destinations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
      });
      const data: IDestination = await response.json();
      dispatch({ type: "destination/created", payload: data });
    } catch (error) {
      const typedError = error as Error;
      dispatch({ type: "rejected", payload: typedError.message });
    }
  };
  const deleteDestination = async (id: string) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`${URL}/destinations/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "destination/deleted", payload: id });
    } catch (error) {
      const typedError = error as Error;
      dispatch({ type: "rejected", payload: typedError.message });
    }
  };

  return (
    <DestinationContext.Provider
      value={{
        destinations,
        isLoading,
        currentDestination,
        getDestination,
        createDestination,
        deleteDestination,
      }}
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
