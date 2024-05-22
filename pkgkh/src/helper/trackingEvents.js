import analytics from '@react-native-firebase/analytics';

const KEY_CLICK_BANNER = 'clickBanner';
const KEY_CLICK_TOOL = 'clickTool';
const KEY_CLICK_LOGIN = 'clickLogin';

export default class TrackingEvent {
    static async setClickBanner({id, url, email}) {
        await analytics().logEvent(KEY_CLICK_BANNER, {
            event_category: "general",
            event_label: "Click Banner",
            idBanner: id,
            urlBanner: url,
            emailOfUser: email,
        });
    }

    static async setClickTool({url, type, email}) {
        await analytics().logEvent(KEY_CLICK_TOOL, {
            event_category: "general",
            event_label: "Click Tool",
            typeTool: url,
            toolName: type,
            emailOfUser: email,
        });
    }
    static async setClickLogin({method}) {
        await analytics().logLogin({
            method:method,
        });
    }
}