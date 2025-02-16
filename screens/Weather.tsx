import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

const weatherapi = process.env.EXPO_PUBLIC_OPENWEATHERAPIKEY;

const WeatherScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        if (location) {
            fetchWeatherData();
            fetchForecastData();
        }
    }, [location]);

    const fetchWeatherData = async () => {
        if (!location) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${weatherapi}`
            );
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    const fetchForecastData = async () => {
        if (!location) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${weatherapi}`
            );
            const data = await response.json();
            setForecastData(data.list);
        } catch (error) {
            console.error("Error fetching forecast data: ", error);
        }
    };

    if (!weatherData) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Weather</Text>
            <LottieView
                source={
                    weatherData.weather[0].main === 'Rain'
                        ? require('../assets/lottie-files/rain.json')
                        : require('../assets/lottie-files/sunny.json')
                }
                style={styles.weatherAnimation}
                autoPlay
                loop
            />
            <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
            <View style={styles.details}>
                <Text style={styles.detailItem}>Humidity: {weatherData.main.humidity}%</Text>
                <Text style={styles.detailItem}>Rain Chance: {forecastData[0]?.pop * 100 || 0}%</Text>
            </View>
            <FlatList
                data={forecastData}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</Text>
                        <Text style={styles.forecastDesc}>{item.weather[0].description}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                style={styles.forecastList}
                contentContainerStyle={styles.forecastListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    weatherAnimation: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    temp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'capitalize',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    detailItem: {
        fontSize: 16,
    },
    forecastList: {
        marginTop: 20,
    },
    forecastListContent: {
        paddingHorizontal: 10,
    },
    forecastItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    forecastTemp: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    forecastDesc: {
        fontSize: 14,
        textTransform: 'capitalize',
    },
});

export default WeatherScreen;
