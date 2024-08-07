import { Receive } from '@enums/events';
import type { DebugEventCallback } from '@typings/events';
import { ReceiveEvent } from './eventsHandlers';
import type { TMenuData } from '@typings/apperance';
import { configTabs } from '@components/micro/tabs';
import {
    APPEARANCE,
    BLACKLIST,
    MODELS,
    ORIGINAL_APPEARANCE,
    OUTFITS,
    SELECTED_TAB,
    TABS,
    TATTOOS,
    LOCALE,
    ALLOW_EXIT,
    JOBDATA
} from '@stores/appearance';
import { deepCopy } from './misc';

const AlwaysListened: DebugEventCallback[] = [
    {
        action: Receive.visible,
        handler: (data: string) => { },
    },
    {
        action: Receive.data,
        handler: (data: TMenuData) => {
            let tabs = [];

            if (data.locale) LOCALE.set(JSON.parse(data.locale))

            if (data.tabs) {
                if (!Array.isArray(data.tabs)) {
                    data.tabs = [data.tabs];
                }

                tabs = configTabs
                    .filter(tab => data.tabs.includes(tab.id))
                    .reverse();

                TABS.set(tabs);
                SELECTED_TAB.set(tabs[tabs.length - 1]);
            }

            if (data.appearance) {
                APPEARANCE.set(data.appearance);
                ORIGINAL_APPEARANCE.set(deepCopy(data.appearance));
            }

            if (data.blacklist) {
                BLACKLIST.set(data.blacklist);
            }

            if (data.tattoos) TATTOOS.set(data.tattoos);
            if (data.models) MODELS.set(data.models);
            if (data.outfits) OUTFITS.set(data.outfits);
            if (data.job) JOBDATA.set(data.job || null);

            if (data.allowExit !== undefined) {
                ALLOW_EXIT.set(data.allowExit)
            } else {
                ALLOW_EXIT.set(true)
            }
        },
    },
];

export default AlwaysListened;

export function InitialiseListen() {
    for (const debug of AlwaysListened) {
        ReceiveEvent(debug.action, debug.handler);
    }
}
