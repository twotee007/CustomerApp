import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useCustomerDetail } from '../hooks/useCustomerDetail';
import { StatusBadge } from '../components/StatusBadge';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CustomerDetail'>;
  route: RouteProp<RootStackParamList, 'CustomerDetail'>;
};

export function CustomerDetailScreen({ navigation, route }: Props) {
  const { customerId } = route.params;
  const { customer, isToggling, handleToggleStatus } = useCustomerDetail(customerId);

  if (!customer) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Customer not found.</Text>
      </View>
    );
  }

  const isActive = customer.status === 'active';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {customer.name
              .split(' ')
              .map(n => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{customer.name}</Text>
        <StatusBadge status={customer.status} />
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <InfoRow icon="mail-outline" label="Email" value={customer.email} />
        {customer.phone && <InfoRow icon="call-outline" label="Phone" value={customer.phone} />}
        {customer.company && <InfoRow icon="business-outline" label="Company" value={customer.company} />}
        {customer.address && <InfoRow icon="location-outline" label="Address" value={customer.address} />}
        <InfoRow icon="calendar-outline" label="Member since" value={customer.createdAt} />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditCustomer', { customerId })}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>Edit Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            isActive ? styles.deactivateButton : styles.activateButton,
          ]}
          onPress={handleToggleStatus}
          disabled={isToggling}
          activeOpacity={0.8}
        >
          {isToggling ? (
            <ActivityIndicator size="small" color={isActive ? '#DC2626' : '#059669'} />
          ) : (
            <>
             
              <Text style={[styles.toggleText, isActive ? styles.deactivateText : styles.activateText]}>
                {isActive ? 'Deactivate' : 'Activate'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={rowStyles.row}>
      <View style={rowStyles.textGroup}>
        <Text style={rowStyles.label}>{label}</Text>
        <Text style={rowStyles.value}>{value}</Text>
      </View>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    color: '#9CA3AF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  actions: {
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  editButton: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6366F1',
  },
  activateButton: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  deactivateButton: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activateText: {
    color: '#059669',
  },
  deactivateText: {
    color: '#DC2626',
  },
});