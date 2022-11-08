/* eslint-disable no-new */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-undef */
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap as Map,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import React, {
  useRef, useState,
  useEffect,
} from 'react';

// Функция определения местоположения пользователя

let center;
if (!center) {
  center = { lat: 30, lng: 31 };
}
navigator.geolocation.getCurrentPosition((position) => {
  center = { lat: position.coords.latitude, lng: position.coords.longitude };
});

function MapsToCard(props) {
  const [libraries] = useState(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState((null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [points, setPoints] = useState(props.points || []);
  const [address, setAddress] = useState([]);

  const originRef = useRef();
  const destiantionRef = useRef();

  // Функционал поиска отелей поблизости
  let service;

  function callback(results, status) {
    const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        new google.maps.Marker({
          map,
          icon: image,
          title: results[i].name,
          position: results[i].geometry.location,
        });
      }
    }
  }

  function getHotels() {
    const lat = JSON.stringify(points[points.length - 1].toJSON().lat);
    const lng = JSON.stringify(points[points.length - 1].toJSON().lng);
    const pyrmont = new google.maps.LatLng(lat, lng);

    const request = {
      location: pyrmont,
      radius: '500',
      type: ['lodging'],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  // Функция геокодера
  useEffect(() => {
    if (points.length) {
      (async function geocodeLatLng() {
        const geocoder = new google.maps.Geocoder();
        const originResults = await geocoder.geocode({ location: points[points.length - 1] });
        setAddress([...address,
          {
            place_id: originResults.results[0].place_id,
            title: originResults.results[0].formatted_address,
          },
        ]);
      }());
    }
  }, [points]);

  // Функция рассчета маршрута

  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();

    let waypoints = [];
    points.map((point) => waypoints.push({ location: point, stopover: false }));
    if (waypoints.length > 2) {
      waypoints.shift();
      waypoints.pop();
    } else {
      waypoints = [];
    }

    if (originRef.current.value === '' && destiantionRef.current.value === '') {
      const results = await directionsService.route({
        origin: { placeId: props.points[0] },
        destination: { placeId: props.points[props.points.length - 1] },
        // waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } else {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  }

  useEffect(() => {
    calculateRoute();
  }, [props]);

  // Функция сброса маршрута

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setPoints([]);
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  // Функция установки маркеров на карте

  const onClick = (e) => {
    setPoints([...points, e.latLng]);
  };

  // Функция удаления маркеров с карты

  function onRightClick() {
    setPoints([...points.filter((el, i) => i !== points.length - 1)]);
  }

  return (
    <>
      {!isLoaded ? (<SkeletonText />)

        : (
          <Flex
            position="relative"
            flexDirection="column"
            alignItems="center"
            h={props.sizeMap.heightMap}
            w={props.sizeMap.widthMap}
          >
            <Box position="absolute" left={0} top={0} h={props.sizeMap.heightMap} w={props.sizeMap.widthMap}>
              {/* Google Map Box */}
              <Map
                center={center}
                zoom={13}
                onClick={onClick}
                onRightClick={onRightClick}
                mapContainerStyle={{ width: props.sizeMap.widthMap, height: props.sizeMap.heightMap }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
              >
                {/* {props.points.map((place_id, i) => (
                  <Marker key={i} position={place_id} />
                ))} */}
                {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
                )}
              </Map>
            </Box>
            <Box
              p={4}
              border="none"
              m={4}
              bgColor="none"
              shadow="base"
              minW="container.md"
              zIndex="1"
              height="1px"
              width="1px"
            >
              <HStack spacing={2} justifyContent="space-between">
                <Box flexGrow={1} right="150px">
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Origin"
                      ref={originRef}
                      right="150px"
                    />
                  </Autocomplete>
                </Box>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Destination"
                      ref={destiantionRef}
                      right="150px"
                    />
                  </Autocomplete>
                </Box>

                <ButtonGroup backgroundColor="none">
                  <Button backgroundColor="rgb(250, 177, 93)" type="submit" onClick={calculateRoute} right="150px">
                    Calculate Route
                  </Button>
                  <Button backgroundColor="rgb(250, 177, 93)" type="submit" onClick={getHotels} right="150px">
                    Get Hotels
                  </Button>
                  <IconButton
                    right="150px"
                    aria-label="center back"
                    icon={<FaTimes />}
                    onClick={clearRoute}
                  />
                </ButtonGroup>
              </HStack>
              <HStack spacing={4} mt={4} justifyContent="space-between" backgroundColor="rgb(250, 177, 93)" borderRadius="10px">
                <Text>
                  Distance:
                  {' '}
                  {distance}
                  {' '}
                </Text>
                <Text>
                  Duration:
                  {' '}
                  {duration}
                  {' '}
                </Text>
                <IconButton
                  aria-label="center back"
                  icon={<FaLocationArrow />}
                  isRound
                  onClick={() => {
                    map.panTo(center);
                    map.setZoom(15);
                  }}
                />
              </HStack>
            </Box>
          </Flex>
        )}

    </>
  );
}

export default MapsToCard;
