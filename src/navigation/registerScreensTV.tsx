import { Navigation } from 'react-native-navigation'
import { Provider } from '@/store/Provider'

import HomeTV from '@/screens/HomeTV'
import PlayerTV from '@/screens/PlayerTV'
import ListDetailTV from '@/screens/ListDetailTV'
import SearchTV from '@/screens/SearchTV'
import SettingsTV from '@/screens/SettingsTV'

import {
    HOME_TV_SCREEN,
    PLAYER_TV_SCREEN,
    LIST_DETAIL_TV_SCREEN,
    SEARCH_TV_SCREEN,
    SETTINGS_TV_SCREEN,
} from './screenNames'

function WrappedComponent(Component: any) {
    return function inject(props: Record<string, any>) {
        const EnhancedComponent = () => (
            <Provider>
                <Component
                    {...props}
                />
            </Provider>
        )

        return <EnhancedComponent />
    }
}

export default () => {
    Navigation.registerComponent(HOME_TV_SCREEN, () => WrappedComponent(HomeTV))
    Navigation.registerComponent(PLAYER_TV_SCREEN, () => WrappedComponent(PlayerTV))
    Navigation.registerComponent(LIST_DETAIL_TV_SCREEN, () => WrappedComponent(ListDetailTV))
    Navigation.registerComponent(SEARCH_TV_SCREEN, () => WrappedComponent(SearchTV))
    Navigation.registerComponent(SETTINGS_TV_SCREEN, () => WrappedComponent(SettingsTV))

    console.info('TV screens have been registered...')
}
