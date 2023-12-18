import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export async function registerForPushNotificationsAsync ()  {
    let token;

        const { status: existingStatus } = await Notifications.getPermissionsAsync(); // check status
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') { // if status isn't granted
            const { status } = await Notifications.requestPermissionsAsync(); // request status
            finalStatus = status;
        }
        if (finalStatus !== 'granted') return; // if denied, return

        token = await Notifications.getExpoPushTokenAsync({ // get expo push token
            projectId: Constants.expoConfig.extra.eas.projectId,
        });

    return token;
}



// listener to handle redirect when user clicks on notification

// const notificationListener = useRef();

// useEffect(async () => {

//     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
//
//         const friendId = notification.request.content.data.friendId;
//         if (friendId) navigate(`/users/${friendId}`);
//     });

//     return () => {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//     }
// }, []);