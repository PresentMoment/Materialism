import React, { useState } from 'react'

export default function Autocomplete(props) {

  const [ activeSuggestion, setActiveSuggestion ] = useState(0);
  const [ filteredSuggestions, setFilteredSuggestios ] = useState([]);
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ userInput, setUserInput] = useState("");

  const handleChange = (props, e) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = props.data.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActiveSuggestion(0);
    setFilteredSuggestios(newFilteredSuggestions);
    setShowSuggestions(true);
    setUserInput(input)
  };

  const handleClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestios([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText)
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38){

      return (activeSuggestion === 0) ? null : setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40){
      return (activeSuggestion - 1 === filteredSuggestions.length) ? null : setActiveSuggestion(activeSuggestion + 1)
    }
  }

  const renderAutocomplete = () => {
    if (showSuggestions && userInput){
      if (filteredSuggestions.length){
        return (
          <ul>
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion.name} onClick={handleClick}>{suggestion.name}</li>
              )
            })}
          </ul>
        )
      } else {
        return (
          <em>not found</em>
        )
      }
    }
    return <></>;
  }
  return(
    <>
    <input
    type="text"
    onChange={(e) => handleChange(props, e)}
    onKeyDown={onKeyDown}
    //value={userInput}
    />
    {renderAutocomplete()}
    </>
  )
}
