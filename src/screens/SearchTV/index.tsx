import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { search } from '@/core/search/music'
import { TVCard } from '@/components/TV/Card'
import { TVTouchable } from '@/components/TV/Touchable'
import { pushPlayerTVScreen } from '@/navigation'
import { handlePlay } from '@/screens/SonglistDetail/listAction' // Reusing handlePlay for simplicity

interface Props {
    componentId: string
}

const SearchTV = ({ componentId }: Props) => {
    const theme = useTheme()
    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState<LX.Music.MusicInfoOnline[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (!searchText.trim()) return
        setLoading(true)
        try {
            // Using 'all' source for broad results
            const data = await search(searchText, 1, 'all')
            setResults(data)
        } catch (err) {
            console.error('Search error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handlePlayMusic = (index: number) => {
        // Reusing logic to play a list of search results
        // We treat search results as a temporary list
        void handlePlay('search', 'all' as any, results, index)
        void pushPlayerTVScreen()
    }

    return (
        <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
            <View style={styles.searchBar}>
                <TextInput
                    style={[styles.input, { color: theme['c-font'], borderColor: theme['c-border-background'] }]}
                    placeholder="搜索音乐 (Search Music)"
                    placeholderTextColor={theme['c-font-label']}
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                    autoFocus
                />
                <TVTouchable
                    onPress={handleSearch}
                    style={[styles.searchButton, { backgroundColor: theme['c-primary'] }]}
                    focusStyle={styles.searchButtonFocused}
                >
                    <Text style={styles.buttonText}>搜索</Text>
                </TVTouchable>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={theme['c-primary']} />
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TVTouchable
                            style={[styles.resultItem, { borderBottomColor: theme['c-border-background'] }]}
                            focusStyle={styles.resultItemFocused}
                            onPress={() => handlePlayMusic(index)}
                        >
                            <View style={styles.resultInfo}>
                                <Text style={[styles.songName, { color: theme['c-font'] }]} numberOfLines={1}>{item.name}</Text>
                                <Text style={[styles.singer, { color: theme['c-font-label'] }]} numberOfLines={1}>{item.singer}</Text>
                            </View>
                        </TVTouchable>
                    )}
                    ListEmptyComponent={
                        searchText && !loading ? (
                            <View style={styles.center}>
                                <Text style={{ color: theme['c-font-label'] }}>未找到相关结果</Text>
                            </View>
                        ) : null
                    }
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
    searchBar: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 18,
        marginRight: 10,
    },
    searchButton: {
        paddingHorizontal: 25,
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
    },
    searchButtonFocused: {
        transform: [{ scale: 1.05 }],
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
    },
    resultItemFocused: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    resultInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    songName: {
        fontSize: 18,
        flex: 1,
    },
    singer: {
        fontSize: 16,
        width: 200,
        textAlign: 'right',
    },
})

export default SearchTV
