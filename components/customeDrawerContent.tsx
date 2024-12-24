import { View, Text, Pressable } from 'react-native';
 import React from 'react';
 import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
 import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomDrawerContent (props: any) {
const {bottom} = useSafeAreaInsets();
return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Pressable style={{padding: 20, paddingBottom: bottom+10}}>
        <Text>Logout</Text>
        </Pressable>
    </View>
    );
}

