import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { usePlayerMusicInfo, useIsPlay, useProgress } from '@/store/player/hook'
import { togglePlay, playNext, playPrev } from '@/core/player/player'
import { TVTouchable } from '@/components/TV/Touchable'
import Icon from 'react-native-vector-icons/Ionicons' // Assuming Ionicons is available
import { formatPlayTime2 } from '@/utils'

const { width, height } = Dimensions.get('window')

const PlayerTV = () => {
    const theme = useTheme()
    const musicInfo = usePlayerMusicInfo()
    const isPlay = useIsPlay()
    const { nowPlayTimeStr, maxPlayTimeStr, progress } = useProgress()

    const picUrl = musicInfo.pic || null

    return (
        <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
            <View style={styles.content}>
                {/* Left: Album Art */}
                <View style={styles.leftPane}>
                    <View style={styles.albumContainer}>
                        {picUrl ? (
                            <Image source={{ uri: picUrl }} style={styles.albumArt} resizeMode="cover" />
                        ) : (
                            <View style={[styles.albumArt, styles.albumPlaceholder, { backgroundColor: theme['c-button-background'] }]}>
                                <Icon name="musical-note" size={100} color={theme['c-font-label']} />
                            </View>
                        )}
                    </View>
                </View>

                {/* Right: Info & Controls */}
                <View style={styles.rightPane}>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.title, { color: theme['c-font'] }]} numberOfLines={2}>
                            {musicInfo.name || 'No Song'}
                        </Text>
                        <Text style={[styles.artist, { color: theme['c-font-label'] }]} numberOfLines={1}>
                            {musicInfo.singer || 'Unknown Artist'}
                        </Text>
                        <Text style={[styles.album, { color: theme['c-font-label'] }]} numberOfLines={1}>
                            {musicInfo.album || 'Unknown Album'}
                        </Text>
                    </View>

                    {/* Progress */}
                    <View style={styles.progressContainer}>
                        <Text style={[styles.timeText, { color: theme['c-font'] }]}>{nowPlayTimeStr}</Text>
                        <View style={[styles.progressBarBase, { backgroundColor: theme['c-button-background'] }]}>
                            <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: theme['c-primary'] }]} />
                        </View>
                        <Text style={[styles.timeText, { color: theme['c-font'] }]}>{maxPlayTimeStr}</Text>
                    </View>

                    {/* Controls */}
                    <View style={styles.controlsContainer}>
                        <TVTouchable onPress={() => playPrev()} style={styles.controlBtn} focusStyle={styles.controlBtnFocused}>
                            <Icon name="play-skip-back" size={30} color={theme['c-font']} />
                        </TVTouchable>

                        <TVTouchable onPress={() => togglePlay()} style={styles.controlBtn} focusStyle={styles.controlBtnFocused}>
                            <Icon name={isPlay ? 'pause' : 'play'} size={40} color={theme['c-font']} />
                        </TVTouchable>

                        <TVTouchable onPress={() => playNext()} style={styles.controlBtn} focusStyle={styles.controlBtnFocused}>
                            <Icon name="play-skip-forward" size={30} color={theme['c-font']} />
                        </TVTouchable>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        padding: 40,
    },
    leftPane: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightPane: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 40,
    },
    albumContainer: {
        width: 300,
        height: 300,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    albumArt: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    albumPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    artist: {
        fontSize: 20,
        marginBottom: 5,
        opacity: 0.8,
    },
    album: {
        fontSize: 18,
        opacity: 0.6,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    progressBarBase: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
    },
    timeText: {
        fontSize: 16,
        fontVariant: ['tabular-nums'],
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    controlBtnFocused: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        transform: [{ scale: 1.1 }],
    },
})

export default PlayerTV
