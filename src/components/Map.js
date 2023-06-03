import React, { useEffect, useState, useCallback } from 'react';

const Map = () => {
  const [map, setMap] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const clearMarkers = useCallback(() => {
    // Remove all markers from the map
    if (map && map.markers) {
      map.markers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  }, [map]);

  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBC7TrnSJ6ZvaNUaspY6zbmOAbrz5PFF04&callback=initMap";    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.addEventListener('load', initializeMap);

    return () => {
      script.removeEventListener('load', initializeMap);
    };
  }, []);

  useEffect(() => {
    // Fetch restaurants data from the API
    fetch('http://localhost:8081/api/restaurants/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const initializeMap = () => {
    if (navigator.geolocation) {
      // Fetch the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
          };
          const newMap = new window.google.maps.Map(
            document.getElementById('map'),
            mapOptions
          );
          newMap.markers = []; // Initialize markers array
          setMap(newMap);
        },
        (error) => {
          console.error('Error getting current location:', error);
          // Default coordinates if user location not available
          const mapOptions = {
            center: { lat: 31.7945, lng: -7.0849 },
            zoom: 15,
          };
          const newMap = new window.google.maps.Map(
            document.getElementById('map'),
            mapOptions
          );
          newMap.markers = []; // Initialize markers array
          setMap(newMap);
        }
      );
    } else {
      // Default coordinates if geolocation not supported
      const mapOptions = {
        center: { lat: 31.7945, lng: -7.0849 },
        zoom: 15,
      };
      const newMap = new window.google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      newMap.markers = []; // Initialize markers array
      setMap(newMap);
    }
  };

  useEffect(() => {
    if (map && Array.isArray(restaurants) && restaurants.length > 0) {
        // Clear existing markers
        clearMarkers();

        // Create new markers for each restaurant
        restaurants.forEach((restaurant) => {
            console.log(restaurant); // Check restaurant details in the console

            const markerOptions = {
                position: { lat: parseFloat(restaurant.lattitude), lng: parseFloat(restaurant.longtitude) },
                map: map,
                title: restaurant.nom,
            };

            const marker = new window.google.maps.Marker(markerOptions);

            // Add click event listener to the marker
            marker.addListener('click', () => {
                console.log(`Clicked marker: ${restaurant.nom}`);
            });
        });
    }
}, [map, restaurants,clearMarkers]);


  return <div id="map" style={{ width: '80%', height: '600px', marginLeft: '190px' }}></div>;
};

export default Map;