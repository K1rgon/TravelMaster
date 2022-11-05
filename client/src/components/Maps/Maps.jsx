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
navigator.geolocation.getCurrentPosition((position) => {
  center = { lat: position.coords.latitude, lng: position.coords.longitude };
});

function Maps() {
  const [libraries] = useState(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState((null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [points, setPoints] = useState([]);
  const [address, setAddress] = useState([]);

  const originRef = useRef();
  const destiantionRef = useRef();

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
        origin: points[0],
        destination: points[points.length - 1],
        waypoints,
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
            h="100vh"
            w="100vw"
          >
            <Box position="absolute" left={0} top={0} h="100%" w="100%">
              {/* Google Map Box */}
              <Map
                center={center}
                zoom={13}
                onClick={onClick}
                onRightClick={onRightClick}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                // options={{
                //   zoomControl: false,
                //   streetViewControl: false,
                //   mapTypeControl: false,
                //   fullscreenControl: false,
                // }}
                onLoad={(map) => setMap(map)}
              >
                {points.map((latLng, i) => (
                  <Marker key={i} position={latLng} />
                ))}
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
              </Map>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              m={4}
              bgColor="white"
              shadow="base"
              minW="container.md"
              zIndex="1"
            >
              <HStack spacing={2} justifyContent="space-between">
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Origin"
                      ref={originRef}
                    />
                  </Autocomplete>
                </Box>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Destination"
                      ref={destiantionRef}
                    />
                  </Autocomplete>
                </Box>

                <ButtonGroup>
                  <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                    Calculate Route
                  </Button>
                  <IconButton
                    aria-label="center back"
                    icon={<FaTimes />}
                    onClick={clearRoute}
                  />
                </ButtonGroup>
              </HStack>
              <HStack spacing={4} mt={4} justifyContent="space-between">
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

export default Maps;
