import { ChangeEvent, MouseEvent, useState } from "react";
import { dateFormater } from "./DestinationItem";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>(
    dateFormater(new Date().toDateString())
  );
  const [note, setNote] = useState<string>("");

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
          Destination Name
        </Input>
        <Input
          id="datetime"
          type="text"
          placeholderText="05/05/2024"
          value={dateTime}
          handleChange={handleDateTime}
        >
          When did you go to?
        </Input>

        <TextArea
          id="note"
          placeholderText="enter small note about your trip plan..."
          value={note}
          handleChange={handleSetNote}
        >
          Notes about your trip to
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
