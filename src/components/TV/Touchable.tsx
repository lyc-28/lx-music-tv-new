import React, { useState } from 'react'
import { Pressable, ViewStyle, StyleProp, PressableProps } from 'react-native'

interface Props extends PressableProps {
    style?: StyleProp<ViewStyle>
    focusStyle?: StyleProp<ViewStyle>
    children: React.ReactNode
}

export const TVTouchable = ({ style, focusStyle, onFocus, onBlur, children, ...props }: Props) => {
    const [focused, setFocused] = useState(false)

    return (
        <Pressable
            {...props}
            onFocus={(e) => {
                setFocused(true)
                onFocus?.(e)
            }}
            onBlur={(e) => {
                setFocused(false)
                onBlur?.(e)
            }}
            style={[style, focused && focusStyle]}
        >
            {children}
        </Pressable>
    )
}
