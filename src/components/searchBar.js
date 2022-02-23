import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Constant from '../utils/constant';
import ScreenSize from './screenSize';
import '../pages/App.css';


function SearchBar(props) {
  const [address, setAddress] = useState("");
  const [errorMessage, setArrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = address => {
    setAddress(address);
    setInputValue(address);
    setArrorMessage('');
  };

  const handleSelect = selected => {
    setAddress("");
    setInputValue(selected);
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        props.moveCamera(lat,lng,selected);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleError = (status, clearSuggestions) => {
    setArrorMessage(errorMessage);
    clearSuggestions();
  };

  return (
    <div>
      <PlacesAutocomplete
        onChange={handleChange}
        value={address}
        onSelect={handleSelect}
        onError={handleError}
        shouldFetchSuggestions={address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div >
              <div>
                <ScreenSize
                  web = {<div className={'search_bar_parent'}>
                  <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder= {Constant.searchPlaceHolder}
                    style={{ background: "aliceblue" }}
                    value={inputValue}
                    {...getInputProps({
                      placeholder: Constant.searchPlaceHolderInputeText,
                    })}
                  />
                </div>}
                  tablet = {<div className={'search_bar_parent_tablet'}>
                  <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder= {Constant.searchPlaceHolder}
                    style={{ background: "aliceblue" }}
                    value={inputValue}
                    {...getInputProps({
                      placeholder: Constant.searchPlaceHolderInputeText,
                    })}
                  />
                </div>}
                  mobile = {<div className={'search_bar_parent_mobile'}>
                  <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder= {Constant.searchPlaceHolder}
                    style={{ background: "aliceblue" }}
                    value={inputValue}
                    {...getInputProps({
                      placeholder: Constant.searchPlaceHolderInputeText,
                    })}
                  />
                </div>}
                />              
              </div>
              {suggestions.length > 0 && (

                <ScreenSize
                  web = {
                    <div
                    className='search_bar_suggestion_list'>
                      {suggestions.map((suggestion, index) => {
                        return (
                          <div key={index}
                            {...getSuggestionItemProps(suggestion)}>
                            <ListItemButton>
                              <ListItemIcon>
                                <SendIcon />
                              </ListItemIcon>
                              <ListItemText primary={suggestion.formattedSuggestion.mainText + " : " + suggestion.formattedSuggestion.secondaryText} />
                            </ListItemButton>
                          </div>
                        );
                      })}
                      <div>
                        <div>
                        </div>
                      </div>
                    </div>}
                

                tablet = {
                  <div
                  className='search_bar_suggestion_list_tablet'>
                    {suggestions.map((suggestion, index) => {
                      return (
                        <div key={index}
                          {...getSuggestionItemProps(suggestion)}>
                          <ListItemButton>
                            <ListItemIcon>
                              <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary={suggestion.formattedSuggestion.mainText + " : " + suggestion.formattedSuggestion.secondaryText} />
                          </ListItemButton>
                        </div>
                      );
                    })}
                    <div>
                      <div>
                      </div>
                    </div>
                  </div>}

                   mobile = {
                    <div
                    className='search_bar_suggestion_list_mobile'>
                      {suggestions.map((suggestion, index) => {
                        return (
                          <div key={index}
                            {...getSuggestionItemProps(suggestion)}>
                            <ListItemButton>
                              <ListItemIcon>
                                <SendIcon />
                              </ListItemIcon>
                              <ListItemText primary={suggestion.formattedSuggestion.mainText + " : " + suggestion.formattedSuggestion.secondaryText} />
                            </ListItemButton>
                          </div>
                        );
                      })}
                      <div>
                        <div>
                        </div>
                      </div>
                    </div>}
                
                
                
                />

              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
      {errorMessage.length > 0 && (
        <Typography variant="subtitle1" component="h5" align="center" mb={1} mt={1}>
         {errorMessage}
        </Typography>
      )}
    </div>
  )

}

export default SearchBar;