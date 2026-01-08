import { Navigation } from 'react-native-navigation'
import { HOME_TV_SCREEN, LIST_DETAIL_TV_SCREEN, PLAYER_TV_SCREEN, SEARCH_TV_SCREEN, SETTINGS_TV_SCREEN } from './screenNames'
import themeState from '@/store/theme/state'
import { type Source } from '@/store/songlist/state'

export async function pushHomeTVScreen() {
    const theme = themeState.theme
    return Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: HOME_TV_SCREEN,
                        options: {
                            topBar: {
                                visible: false,
                                height: 0,
                                drawBehind: false,
                            },
                            statusBar: {
                                visible: false,
                            },
                            navigationBar: {
                                visible: false,
                            },
                            layout: {
                                componentBackgroundColor: theme['c-content-background'],
                                orientation: ['landscape'],
                            },
                        },
                    },
                }],
            },
        },
    })
}

export async function pushPlayerTVScreen() {
    const theme = themeState.theme
    return Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: PLAYER_TV_SCREEN,
                    options: {
                        topBar: { visible: false, height: 0 },
                        statusBar: { visible: false },
                        layout: { componentBackgroundColor: theme['c-content-background'] },
                    },
                },
            }],
        },
    })
}

export async function pushListDetailTVScreen(componentId: string, id: string, source: Source) {
    const theme = themeState.theme
    return Navigation.push(componentId, {
        component: {
            name: LIST_DETAIL_TV_SCREEN,
            passProps: { id, source },
            options: {
                topBar: { visible: false, height: 0 },
                layout: { componentBackgroundColor: theme['c-content-background'] },
            },
        },
    })
}

export async function pushSearchTVScreen(componentId: string) {
    const theme = themeState.theme
    return Navigation.push(componentId, {
        component: {
            name: SEARCH_TV_SCREEN,
            options: {
                topBar: { visible: false, height: 0 },
                layout: { componentBackgroundColor: theme['c-content-background'] },
            },
        },
    })
}

export async function pushSettingsTVScreen(componentId: string) {
    const theme = themeState.theme
    return Navigation.push(componentId, {
        component: {
            name: SETTINGS_TV_SCREEN,
            options: {
                topBar: { visible: false, height: 0 },
                layout: { componentBackgroundColor: theme['c-content-background'] },
            },
        },
    })
}
