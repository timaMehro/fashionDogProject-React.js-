
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { AppUser, authorized , AuthorizeFunctionType, AutorizeType, getUser } from "../../utils/helpers/authHelper";


export interface AppRouteProps {

    layout?: any;
    component?: any;
    authorize?: AutorizeType | AuthorizeFunctionType;

    redirectPath?: string;

}

class AppRoute extends React.Component<AppRouteProps & DispatchProp & RouteProps, any> {



    public render() {
        const that = this;
        const { redirectPath, layout, component, authorize, ...rest } = this.props;
        let Layout = layout;
        const Component = component;
        if (Layout === undefined) {
            Layout = (props: any) => (<React.Fragment>{props.children}</React.Fragment>); // or you can set 'Layout = DefaultLayout'
        }

        if (authorize &&  !component) {
            const user = getUser();
            const match: any = null;
            const from: any = null;
            const isauthorized = (typeof authorize === "function") ? authorize(user, match) : authorized(authorize, user, match);
            if (!isauthorized ) {
                return (<Redirect to={{ pathname: redirectPath || "/", state: { from } }} />);
            }
        }
        return (<Route {...rest} render={(matchProps) => {

            const Content = (
                <Layout>
                    <Component {...matchProps} />
                </Layout>);

            if (authorize) {
                const user = getUser();
                const match = matchProps;
                const from = matchProps.location;
                const isauthorized = (typeof authorize === "function") ? authorize(user, match) : authorized(authorize, user, match);
                return isauthorized ? Content
                    : (<Redirect to={{ pathname: redirectPath || "/", state: { from } }} />);
            }
            return Content;


        }} />
        );
    }
}

export default connect()(AppRoute);
