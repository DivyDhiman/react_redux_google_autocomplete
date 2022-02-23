import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import SearchBar from "../components/searchBar"
import DrawerList from "../components/drawerList"
import Fab from '@mui/material/Fab';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { useSelector, useDispatch } from "react-redux";
import { PLACE_AUTOCOMPLETE_MARKER, PLACE_AUTOCOMPLETE_SEARCH_HISTORY } from "../redux/actions/placeAutocompleteAction";
import Drawer from '@mui/material/Drawer';
import Constant from "../utils/constant";
import env from "react-dotenv";
import '../pages/App.css';

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 4.2105,
  lng: 101.9758,
};


export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:env.GOOGLE_API_KEY,
    libraries,
  });

  const [state, setState] = React.useState(false);
  const placeAutocompleteReducer = useSelector((state) => state.placeAutocompleteReducer);
  const dispatch = useDispatch();
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const moveCamera = ((lat, lng, address) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
    dispatch({
      type: PLACE_AUTOCOMPLETE_MARKER,
      marker: {
        "lat": lat,
        "lng": lng
      }
    })
    dispatch({
      type: PLACE_AUTOCOMPLETE_SEARCH_HISTORY,
      lat: lat,
      lng: lng,
      address: address
    })
  });

  if (loadError) return Constant.error;
  if (!isLoaded) return Constant.loading;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const toggleDrawerCallback = ((toogleValue) => {
    setState(toogleValue);
  });


  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={{
          disableDefaultUI: true,
        }}
        onLoad={onMapLoad}
      >
        <SearchBar moveCamera={moveCamera} />

        {placeAutocompleteReducer.marker != null ?
          <Marker
            key={`${placeAutocompleteReducer.marker.lat}-${placeAutocompleteReducer.marker.lng}`}
            position={{ lat: placeAutocompleteReducer.marker.lat, lng: placeAutocompleteReducer.marker.lng }}
          />
          : <div></div>
        }

        <Fab color="primary" aria-label="add" variant="extended"          
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
          }}
         onClick={toggleDrawer(true)}>
          <HistoryToggleOffIcon />
        </Fab>

        <Drawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer(false)}
        >
          <DrawerList
            list={placeAutocompleteReducer.searchHistory}
            toggleDrawer={toggleDrawerCallback}
          />
        </Drawer>
      </GoogleMap>

    </div>
  );

}
