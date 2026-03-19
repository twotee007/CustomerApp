import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { CustomerListScreen } from '../screens/CustomerListScreen';
import { CustomerDetailScreen } from '../screens/CustomerDetailScreen';
import { EditCustomerScreen } from '../screens/EditCustomerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CustomerList"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#111827',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#F9FAFB' },
        }}
      >
        <Stack.Screen
          name="CustomerList"
          component={CustomerListScreen}
          options={{ title: 'Customers' }}
        />
        <Stack.Screen
          name="CustomerDetail"
          component={CustomerDetailScreen}
          options={{ title: 'Customer Detail' }}
        />
        <Stack.Screen
          name="EditCustomer"
          component={EditCustomerScreen}
          options={{ title: 'Edit Customer' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}