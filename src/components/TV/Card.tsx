import React from 'react'
import { View, Text, StyleSheet, Image, ViewStyle, ImageSourcePropType } from 'react-native'
import { TVTouchable } from './Touchable'

interface Props {
    title: string
    subtitle?: string
    image?: ImageSourcePropType | { uri: string }
    onPress?: () => void
    style?: ViewStyle
}

export const TVCard = ({ title, subtitle, image, onPress, style }: Props) => {
    return (
        <TVTouchable
            onPress={onPress}
            style={[styles.container, style]}
            focusStyle={styles.focused}
        >
            <View style={styles.imageContainer}>
                {image && <Image source={image} style={styles.image} resizeMode="cover" />}
            </View>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
            </View>
        </TVTouchable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 200,
        backgroundColor: '#222',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 10,
    },
    focused: {
        borderColor: '#039893',
        borderWidth: 3,
        transform: [{ scale: 1.05 }],
        backgroundColor: '#333',
    },
    imageContainer: {
        width: '100%',
        height: 140,
        backgroundColor: '#444',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        padding: 8,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 4,
    },
})
