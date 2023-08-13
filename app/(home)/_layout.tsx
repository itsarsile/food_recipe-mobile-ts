import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }}/>
    </Stack>
  )
}

const styles = StyleSheet.create({})