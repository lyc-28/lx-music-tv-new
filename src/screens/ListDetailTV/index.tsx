import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { getListDetail } from '@/core/songlist'
import { handlePlay } from '@/screens/SonglistDetail/listAction'
import { TVTouchable } from '@/components/TV/Touchable'
import { useTheme } from '@/store/theme/hook'
import { type Source } from '@/store/songlist/state'
import { navigations, pushPlayerTVScreen } from '@/navigation'

interface Props {
    id: string
    source: Source
}

const ListDetailTV = ({ id, source }: Props) => {
    const theme = useTheme()
    const [list, setList] = useState<LX.Music.MusicInfoOnline[]>([])
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchList = async () => {
            setLoading(true)
            try {
                const data = await getListDetail(id, source, 1)
                if (data && data.list) {
                    setList(data.list)
                    if (data.info && data.info.name) setTitle(data.info.name)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchList()
    }, [id, source])

    const handleItemPress = (index: number) => {
        void handlePlay(id, source, list, index)
        // Optionally navigate to Player, but handlePlay might trigger state change that we can observe?
        // Usually Player opens automatically or we push it?
        // In mobile, PlayerBar is always visible or we push PlayDetail.
        // In TV, maybe we should push PlayerTV?
        void pushPlayerTVScreen()
    }

    return (
        <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
            <Text style={[styles.title, { color: theme['c-font'] }]}>{title || 'List Detail'}</Text>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={theme['c-primary']} />
                </View>
            ) : (
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item, index }) => (
                        <TVTouchable
                            style={[styles.item, { borderBottomColor: theme['c-border-background'] }]}
                            focusStyle={styles.itemFocused}
                            onPress={() => handleItemPress(index)}
                        >
                            <Text style={[styles.itemText, { color: theme['c-font'] }]}>{index + 1}. {item.name}</Text>
                            <Text style={[styles.itemSubText, { color: theme['c-font-label'] }]}>{item.singer}</Text>
                        </TVTouchable>
                    )}
                />
            )}
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemFocused: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: [{ scale: 1.02 }],
    },
    itemText: {
        fontSize: 18,
        flex: 1,
    },
    itemSubText: {
        fontSize: 16,
        width: 150,
        textAlign: 'right',
    },
})

export default ListDetailTV
