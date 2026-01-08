import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { TVCard } from '@/components/TV/Card'
import { getBoardsList } from '@/core/leaderboard'
import { getList } from '@/core/songlist'
import leaderboardState, { type BoardItem } from '@/store/leaderboard/state'
import songlistState, { type ListInfoItem, type Source } from '@/store/songlist/state'
import { useTheme } from '@/store/theme/hook'
import { pushListDetailTVScreen, pushSearchTVScreen, pushSettingsTVScreen } from '@/navigation'
import { TVTouchable } from '@/components/TV/Touchable'

interface Props {
  componentId: string
}

const HomeTV = ({ componentId }: Props) => {
  const theme = useTheme()
  const [boards, setBoards] = useState<BoardItem[]>([])
  const [songList, setSongList] = useState<ListInfoItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch Leaderboards
        const lbSource = leaderboardState.sources[0]
        if (lbSource) {
          const lbList = await getBoardsList(lbSource)
          if (lbList) setBoards(lbList)
        }

        // Fetch Recommended Song Lists
        const slSource = songlistState.sources[0]
        if (slSource) {
          const sorts = songlistState.sortList[slSource]
          const sortId = sorts ? sorts[0].id : undefined
          const slData = await getList(slSource, '', sortId || 'new', 1)
          if (slData && slData.list) {
            setSongList(slData.list)
          }
        }
      } catch (err) {
        console.error('HomeTV Fetch Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleBoardPress = (item: BoardItem) => {
    const [source, id] = item.id.split('__')
    if (source && id) {
      // @ts-ignore
      void pushListDetailTVScreen(componentId, item.id, item.source || source as Source)
    }
  }

  const handleSongListPress = (item: ListInfoItem) => {
    void pushListDetailTVScreen(componentId, item.id, item.source)
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme['c-content-background'] }]}>
        <ActivityIndicator size="large" color={theme['c-primary']} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header/Search & Settings */}
        <View style={styles.header}>
          <TVTouchable
            onPress={() => void pushSearchTVScreen(componentId)}
            style={[styles.searchEntry, { backgroundColor: theme['c-button-background'], flex: 1, marginRight: 10 }]}
            focusStyle={{ borderColor: theme['c-primary'], borderWidth: 2 }}
          >
            <Text style={{ color: theme['c-font-label'], fontSize: 20 }}>🔍 搜索 (Search)</Text>
          </TVTouchable>
          <TVTouchable
            onPress={() => void pushSettingsTVScreen(componentId)}
            style={[styles.searchEntry, { backgroundColor: theme['c-button-background'], paddingHorizontal: 30 }]}
            focusStyle={{ borderColor: theme['c-primary'], borderWidth: 2 }}
          >
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TVTouchable>
        </View>

        {/* Recommended Playlists */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme['c-font'] }]}>推荐歌单 (Recommended)</Text>
          <FlatList
            horizontal
            data={songList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TVCard
                title={item.name}
                subtitle={item.author}
                image={item.img ? { uri: item.img } : undefined}
                onPress={() => handleSongListPress(item)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Leaderboards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme['c-font'] }]}>排行榜 (Leaderboard)</Text>
          <FlatList
            horizontal
            data={boards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TVCard
                title={item.name}
                subtitle={item.bangid}
                onPress={() => handleBoardPress(item)}
                style={{ height: 100 }}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  searchEntry: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
  },
})

export default HomeTV
