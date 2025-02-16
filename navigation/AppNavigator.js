import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherScreen from "../screens/Weather";
import Community from "../screens/Community";
import Marketplace from "../screens/Marketplace";
import Tractors from "../screens/Tractors";
import HomeScreen from "../screens/HomeScreen";
import Sell from "../screens/Sell";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen 
                name="Weather" 
                component={WeatherScreen}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="cloudy-night-outline" size={size} color={color} />
                    )
                }}
            />
            
            <Tab.Screen 
                name="Community" 
                component={Community}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="people" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen 
                name="Market" 
                component={Marketplace}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="storefront-outline" size={size} color={color} />
                    )
                }}
            />
            
            <Tab.Screen 
                name="Tractors" 
                component={Tractors}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons name="tractor-variant" size={size} color={color} />
                    )
                }}
            />
            
            <Tab.Screen 
                name="Sell" 
                component={Sell}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons name="attach-money" size={size} color={color} />
                    )
                }}
            /> 
        </Tab.Navigator>
    );
}