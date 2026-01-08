import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { useSettingValue } from '@/store/setting/hook'
import { updateSetting } from '@/core/common'
import { setTheme } from '@/core/theme'
import { TVTouchable } from '@/components/TV/Touchable'
import { getAllThemes } from '@/theme/themes'
import songlistState from '@/store/songlist/state'
const version = '1.8.0' // Hardcoded for TV build stability

const SettingsTV = () => {
    const theme = useTheme()
    const currentThemeId = useSettingValue('theme.id')
    const currentSource = useSettingValue('common.apiSource') || 'kw'
    const [themes, setThemes] = useState<any[]>([])

    useEffect(() => {
        void getAllThemes().then(info => setThemes([...info.themes]))
    }, [])

    const handleThemeChange = (id: string) => {
        setTheme(id)
    }

    const handleSourceChange = (source: string) => {
        updateSetting({ 'common.apiSource': source as any })
    }

    return (
        <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
            <Text style={[styles.title, { color: theme['c-font'] }]}>设置 (Settings)</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* API Source */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme['c-font-label'] }]}>音乐来源 (API Source)</Text>
                    <View style={styles.optionsRow}>
                        {songlistState.sources.map(source => (
                            <TVTouchable
                                key={source}
                                onPress={() => handleSourceChange(source)}
                                style={[
                                    styles.optionBtn,
                                    { backgroundColor: theme['c-button-background'] },
                                    currentSource === source && { borderColor: theme['c-primary'], borderWidth: 2 }
                                ]}
                                focusStyle={styles.optionBtnFocused}
                            >
                                <Text style={{ color: currentSource === source ? theme['c-primary'] : theme['c-font'] }}>{source.toUpperCase()}</Text>
                            </TVTouchable>
                        ))}
                    </View>
                </View>

                {/* Theme */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme['c-font-label'] }]}>主题设置 (Theme)</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionsRow}>
                        {themes.slice(0, 10).map(t => (
                            <TVTouchable
                                key={t.id}
                                onPress={() => handleThemeChange(t.id)}
                                style={[
                                    styles.optionBtn,
                                    { backgroundColor: theme['c-button-background'] },
                                    currentThemeId === t.id && { borderColor: theme['c-primary'], borderWidth: 2 }
                                ]}
                                focusStyle={styles.optionBtnFocused}
                            >
                                <Text style={{ color: currentThemeId === t.id ? theme['c-primary'] : theme['c-font'] }}>{t.id}</Text>
                            </TVTouchable>
                        ))}
                    </ScrollView>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme['c-font-label'] }]}>关于 (About)</Text>
                    <View style={[styles.aboutCard, { backgroundColor: theme['c-button-background'] }]}>
                        <Text style={{ color: theme['c-font'] }}>Version: {version}</Text>
                        <Text style={{ color: theme['c-font-label'], marginTop: 5 }}>Adapted for Android TV by Antigravity</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    optionBtnFocused: {
        transform: [{ scale: 1.1 }],
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    aboutCard: {
        padding: 20,
        borderRadius: 10,
    }
})

export default SettingsTV
