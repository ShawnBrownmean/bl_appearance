import { DebugAction } from '@typings/events';
import { toggleVisible } from './visibility';
import { DebugEventSend } from '@utils/eventsHandlers';
import { Receive } from '@enums/events';
import {
    debugAppearance,
    debugBlacklist,
    debugModels,
    debugOutfits,
    debugTattoos,
} from './debugAppearance';
import type { TMenuData } from '@typings/apperance';
import debugLocale from './debugLocale';


/**
 * The initial debug actions to run on startup
 */
const InitDebug: DebugAction[] = [
    {
        label: 'Visible',
        action: () => toggleVisible(true),
        delay: 500,
    },
    {
        label: 'Data',
        action: () => {
            let tabs = [
                'heritage',
                'hair',
                'clothes',
                'accessories',
                'face',
                'makeup',
                'outfits',
                'tattoos',
            ];

            DebugEventSend<TMenuData>(Receive.data, {
                tabs: tabs,
                appearance: debugAppearance,
                allowExit: true,
                blacklist: debugBlacklist,
                tattoos: debugTattoos,
                outfits: debugOutfits,
                models: debugModels,
                locale: JSON.stringify(debugLocale),
            });
        },
    },
];

export default InitDebug;

export function InitialiseDebugSenders(): void {
    for (const debug of InitDebug) {
        setTimeout(() => {
            debug.action();
        }, debug.delay || 0);
    }
}
