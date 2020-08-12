import React, { useState } from "react";
import styled from "@emotion/styled";

const Location = ({ city, country, getWeather }) => {
  const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState(false);

  return (
    <Container>
      {!inputMode && <City onClick={() => setInputMode(true)}>{city}</City>}
      {inputMode && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getWeather(query);
          }}
        >
          <Textbox
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
          <Button onClick={() => setInputMode(false)}>Cancel</Button>
        </form>
      )}
      <Country>{country}</Country>
    </Container>
  );
};

export default Location;

const Container = styled.div`
  text-align: center;
`;
const City = styled.h1`
  font-family: "Merriweather", sans-serif;
  font-size: 1.6rem;
  position: relative;
  cursor: pointer;
  &:hover {
    top: -5px;
  }
`;
const Country = styled.h3`
  font-family: "Fira Sans", sans-serif;
  font-size: 1.1rem;
`;

const Textbox = styled.input`
  font-family: "Fira Sans", sans-serif;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1.2rem;
  border-radius: 15px;
  width: 90%;
`;

const Button = styled.button`
  font-family: "Fira Sans", sans-serif;
  font-weight: 200;
  border-radius: 10px;
  width: 45%;
`;
