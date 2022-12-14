/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ColorSchemeName, Pressable, Button, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TasksScreen from '../screens/TasksScreen';
import UsersScreen from '../screens/UsersScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignOutButton from '../components/SignOutButton/SignOutButton';
import AddFriendButton from '../components/AddFriendButton/AddFriendButton';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ViewOnlyTasksScreen from '../screens/ViewOnlyTasksScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="ViewOnlyTasks" component={ViewOnlyTasksScreen} options={({ route }) => ({ title: route.params.username })} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="About" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Tasks"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Tasks"
                component={TasksScreen}
                options={({ navigation }: RootTabScreenProps<'Tasks'>) => ({
                    title: 'Tasks',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="tasks" size={24} color={color} />,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('About')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={"#448f4b"}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                    headerRight: (props) => (
                        <AddFriendButton {...props} />
                    ),
                })}
            />
            <BottomTab.Screen
                name="Users"
                component={UsersScreen}
                options={({ navigation }: RootTabScreenProps<'Users'>) => ({
                    title: 'Users',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="users" size={24} color={color} />,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('About')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={"#448f4b"}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
                    title: 'Profile',
                    headerRight: () => (
                        <SignOutButton />
                    ), headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('About')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={"#448f4b"}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                    tabBarIcon: ({ color }) => <FontAwesome5 name="house-user" size={24} color={color} />,
                })}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
