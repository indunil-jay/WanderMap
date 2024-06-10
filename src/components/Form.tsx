import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IDestination, useDestination } from "../contexts/Destinations";

const REVERSE_GEO_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

const convertToEmoji = (countryCode: string): string => {
  const upperCaseCountryCode = countryCode.toUpperCase();
  const codePoints = upperCaseCountryCode.split("").map((char) => {
    return 127462 + char.charCodeAt(0) - "A".charCodeAt(0);
  });
  return String.fromCodePoint(...codePoints);
};

const Form = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [errorLocation, setErrorLocation] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const { lat, lng } = useURLPosition();
  const { createDestination, isLoading: createLoading } = useDestination();

  useEffect(() => {
    if (!lat && !lng) return;
    const fetchDestinationData = async () => {
      try {
        setIsLoading(true);
        setErrorLocation("");
        const response = await fetch(
          `${REVERSE_GEO_URL}latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a valid country. Click somewhere else. 😥 "
          );
        }

        setDestination(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error: unknown) {
        const typedError = error as Error;
        setErrorLocation(typedError?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinationData();
  }, [lat, lng]);

  const handleDestination = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };
  const handleSetNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination || !dateTime) return;

    const newDestination: Partial<IDestination> = {
      cityName: destination,
      country,
      date: dateTime.toDateString(),
      emoji,
      notes: note,
      position: {
        lat,
        lng,
      },
    };
    createDestination(newDestination);
    navigate("/app");
  };

  if (!lat && !lng) {
    return (
      <div className="border border-dashed border-secondary bg-secondary/20 rounded-md">
        <span className="block p-8 text-[20px] text-light-0 font-medium w-[80%] mx-auto text-center">
          Click somewhere on the map to get the location.
        </span>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (errorLocation) {
    return (
      <div className="border border-dashed border-secondary bg-secondary/20 rounded-md">
        <span className="block p-8 text-[20px] text-light-0 font-medium w-[80%] mx-auto text-center">
          {errorLocation}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4">
      <form
        action=""
        className="flex h-full rounded-lg flex-col gap-3 bg-dark-3 p-[1rem] xl:p-[3rem] disabled:opacity-25"
        onSubmit={handleSubmit}
      >
        <Input
          id="destination"
          type="text"
          placeholderText="ex : london"
          value={destination}
          handleChange={handleDestination}
        >
          Destination Name {emoji}
        </Input>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="datetime"
            className=" text-[14px] lg:text-[18px] font-medium"
          >
            When did you go to {country}?
          </label>
          <ReactDatePicker
            id="datetime"
            onChange={(date) => setDateTime(date)}
            selected={dateTime}
            dateFormat="dd/MM/yyyy"
            className="w-full  rounded-lg bg-light-1 text-[18px] text-dark-1 px-5 py-3 font-medium
            border-1 border-transparent shadow-md shadow-dark-3 placeholder-light-2
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
            disabled:bg-light-1/60 disabled:text-dark-3 disabled:border-light-0/50 disabled:shadow-none disabled:placeholder-dark-3
            invalid:border-red-600 invalid:text-red-600
            focus:invalid:border-red-600 focus:invalid:ring-red-600
            caret-dark-3/50
            "
          />
        </div>

        <TextArea
          id="note"
          placeholderText="enter small note about your trip plan..."
          value={note}
          handleChange={handleSetNote}
        >
          Notes about your trip to {country}
        </TextArea>

        <div className="flex justify-between items-center mt-8">
          <Button
            disable={createLoading}
            fill={false}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </Button>

          <Button disable={createLoading}>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
