import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomerStatus } from '../types/customer';

interface Props {
  status: CustomerStatus;
}

export function StatusBadge({ status }: Props) {
  const isActive = status === 'active';
  return (
    <View style={[styles.badge, isActive ? styles.active : styles.inactive]}>
      <View style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive]} />
      <Text style={[styles.text, isActive ? styles.textActive : styles.textInactive]}>
        {isActive ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  active: {
    backgroundColor: '#ECFDF5',
  },
  inactive: {
    backgroundColor: '#FEF2F2',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#10B981',
  },
  dotInactive: {
    backgroundColor: '#EF4444',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textActive: {
    color: '#059669',
  },
  textInactive: {
    color: '#DC2626',
  },
});