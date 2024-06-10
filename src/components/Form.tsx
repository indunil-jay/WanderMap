import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { dateFormater } from "./DestinationItem";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";

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
  const [dateTime, setDateTime] = useState<string>(
    dateFormater(new Date().toDateString())
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [errorLocation, setErrorLocation] = useState<string>("");
  const [emoji, setEmoji] = useState<string>();
  const { lat, lng } = useURLPosition();

  useEffect(() => {
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
  const handleDateTime = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
  };
  const handleSetNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit = () => {
    console.log(note, dateTime, destination);
  };

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
    <div className="w-full h-[65vh]">
      <form
        action=""
        className="flex flex-col gap-3 bg-dark-3 p-[3rem] "
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
        <Input
          id="datetime"
          type="text"
          placeholderText="05/05/2024"
          value={dateTime}
          handleChange={handleDateTime}
        >
          When did you go to {country}?
        </Input>

        <TextArea
          id="note"
          placeholderText="enter small note about your trip plan..."
          value={note}
          handleChange={handleSetNote}
        >
          Notes about your trip to {country}
        </TextArea>

        <div className="flex justify-between items-center mt-8">
          <Button onClick={() => {}}>Add</Button>
          <Button
            fill={false}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
