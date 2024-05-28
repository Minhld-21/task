import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '~theme';
import {
  Store,
  DetailProduct,
  DetailCart,
  EmptyCart,
  Login,
  Register,
  ChangePass,
  ForgetPass,
  Vnpay,
  Profile,
  Payment,
  Order,
  DetailOrder,
  Info,
  Policy,
  Branch,
  Notify,
  FengShui,
  SiginNumero,
  ResultFengShui,
  ConsultFengShui,
  HistoryFengShui,
  TimeKeeping,
  TimeSheet,
  QRCheck,
  ConfirmCheck,
  CheckPoint,
  CreateCP,
  RepairCP,
  CheckPointDetail,
  test,
} from '~screens';
import {
  userSelectors,
  commonSelectors,
  commonActions,
} from '~reduxCore/reducers';
import {navigate, navigationRef} from './navigationUtils';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackScreen = (name, component, options = {headerShown: false}) => (
  <Stack.Screen
    key={name}
    name={name}
    component={component}
    options={{headerShown: false, ...options}}
  />
);

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'HomeStack') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'OrderStack') {
    iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
  } else if (route.name === 'FengStack') {
    iconName = focused ? 'yin-yang' : 'yin-yang';
  } else if (route.name === 'ProfileStack') {
    iconName = focused ? 'account' : 'account-outline';
  } else if (route.name === 'InfoStack') {
    iconName = focused ? 'book' : 'book-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {[
      'store',
      'detailProduct',
      'detailCart',
      'emptyCart',
      'payment',
      'paymentVnpay',
    ].map(name =>
      StackScreen(
        name,
        {
          store: Store,
          detailProduct: DetailProduct,
          detailCart: DetailCart,
          emptyCart: EmptyCart,
          payment: Payment,
          paymentVnpay: Vnpay,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {['login', 'profile', 'relogin', 'regis', 'forgetPass'].map(name =>
      StackScreen(
        name,
        {
          login: Login,
          profile: Profile,
          relogin: Login,
          regis: Register,
          forgetPass: ForgetPass,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {['profile', 'changePass'].map(name =>
      StackScreen(
        name,
        {
          profile: Profile,
          changePass: ChangePass,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const OrderStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {['order', 'detailOrder'].map(name =>
      StackScreen(
        name,
        {
          order: Order,
          detailOrder: DetailOrder,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const FengStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {[
      'fengshui',
      'consultfengshui',
      'siginnumero',
      'resultfengshui',
      'historyfengshui',
    ].map(name =>
      StackScreen(
        name,
        {
          fengshui: FengShui,
          consultfengshui: ConsultFengShui,
          siginnumero: SiginNumero,
          resultfengshui: ResultFengShui,
          historyfengshui: HistoryFengShui,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const InfoStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {[
      'info',
      'branch',
      'policy',
      'notify',
      'timekeeping',
      'timesheet',
      'qrcheck',
      'confirmcheck',
      'checkpoint',
      'createcp',
      'repaircp',
      'checkpointdetail',
      'test',
    ].map(name =>
      StackScreen(
        name,
        {
          info: Info,
          branch: Branch,
          policy: Policy,
          notify: Notify,
          timekeeping: TimeKeeping,
          timesheet: TimeSheet,
          qrcheck: QRCheck,
          confirmcheck: ConfirmCheck,
          checkpoint: CheckPoint,
          createcp: CreateCP,
          repaircp: RepairCP,
          checkpointdetail: CheckPointDetail,
          test: test,
        }[name],
      ),
    )}
  </Stack.Navigator>
);

const SignedIn = ({navigation, route}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const routeName = getFocusedRouteNameFromRoute(route);
  const routeSave = useSelector(state => commonSelectors.getRoute(state));
  const user = useSelector(state => userSelectors.getUserData(state));
  useEffect(() => {
    if (routeName !== undefined) {
      dispatch(commonActions.setRoute(routeName));
    } else {
      user !== null ? navigate(routeSave) : navigate('HomeStack');
    }
  }, [routeName]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route, focused, color, size),
      })}
      tabBarOptions={{
        activeTintColor: Colors.info,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: t('store')}}
      />
      <Tab.Screen
        name="OrderStack"
        component={OrderStack}
        options={{title: t('order')}}
      />
      <Tab.Screen
        name="FengStack"
        component={FengStack}
        options={{title: t('fengshui')}}
      />
      <Tab.Screen
        name="InfoStack"
        component={InfoStack}
        options={{title: t('info')}}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: t('account')}}
      />
    </Tab.Navigator>
  );
};

const SignedOut = ({navigation, route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccountStack" component={AccountStack} />
    </Stack.Navigator>
  );
};

const Navigation = React.forwardRef(() => {
  const visibleLogin = useSelector(state =>
    userSelectors.getVisibleLogin(state),
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
        mode="card"
        headerMode="none"
        animation="fade">
        {visibleLogin === false ? (
          <Stack.Screen name="SignedOut" component={SignedOut} />
        ) : (
          <Stack.Screen name="SignedIn" component={SignedIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Navigation;
