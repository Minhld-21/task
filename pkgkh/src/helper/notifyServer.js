import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Config from 'react-native-config';
import { Platform } from "react-native";

// Config option notification
const options = {
    playSound: true,
    soundName: 'default',
    channelId: Config.NOTIFICATION_CHANNEL_ID,
    channelName: Config.APP_NAME,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher',
    importance: 4,
    vibrate: true,
    vibration: 300,
    priority: 'high',
    number: 1,
  }
  const showNotificationNow =(title, message)=> {
    if(Platform ==='ios')
    {
        PushNotificationIOS.presentLocalNotification({
            alertTitle: title,
            alertBody :message,
        });
    }
    else
    {
        PushNotification.localNotification({
            channelId: Config.NOTIFICATION_CHANNEL_ID,
            title: title,
            message :message,
        });
    }
}
// time = seconds
const handleSchedulePushNotification = (title,message, time=5)=>{
    let date  = new Date();
    date.setSeconds(date.getSeconds() +time);
    if(Platform==='ios')
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody :message,
        fireDate: date.toISOString(),
    })
    else
    PushNotification.localNotificationSchedule({
        channelId: Config.NOTIFICATION_CHANNEL_ID,
        title: title,
        message :message,
        date: date,
    })
}

const handleCancelNotification =()=>{
    if(Platform ==='ios')
    {
        PushNotificationIOS.removeAllDeliveredNotifications();
        PushNotification.setApplicationIconBadgeNumber(0);
    }   
    else
    PushNotification.cancelAllLocalNotifications();
}


export {showNotificationNow, handleSchedulePushNotification, handleCancelNotification}