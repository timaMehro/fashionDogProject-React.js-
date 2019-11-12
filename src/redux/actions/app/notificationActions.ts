export const NOTIFICATION_HIDE = "@CCR/NOTIFICATION_HIDE";
export const NOTIFICATION_SHOW = "@CCR/NOTIFICATION_SHOW";

export function showNotification(message: string, options?: {
    type?: "success" | "info" | "warning" | "danger",
    closeable?: boolean,
    anchorOrigin?: {
        vertical: "top" | "bottom",
        horizontal: "left" | "center" | "right"
    },
    hideTimeout?: number,
}) {
    return (dispath: any) => {
        if (options && options.hideTimeout) {
            setTimeout(() => {
                dispath({
                    type: NOTIFICATION_HIDE,
                    message,
                    config: options,
                });
            }, options.hideTimeout);
        }
        return dispath({
            type: NOTIFICATION_SHOW,
            message,
            config: options,
        });
    };
}

export function hideNotification() {
    return (dispatch: any) => {
        return dispatch({
            type: NOTIFICATION_HIDE,
        });
    };
}
