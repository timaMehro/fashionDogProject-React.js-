import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { getAll } from "../../../redux/actions/support/ticketsActions"


export interface TicketsFormViewPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface TicketsFormViewStates {

}

class TicketsFormView extends React.Component<TicketsFormViewPorps, TicketsFormViewStates> {
    constructor(props: TicketsFormViewPorps, states: TicketsFormViewStates) {
        super(props, states);

    }


    public reloadData() {
        const { dispatch } = this.props;
        dispatch(getAll());
    }
    public componentDidMount() {
        this.reloadData();
    }
    public render() {
        const { dispatch } = this.props;
        const cartegoryDefinition: FormDefinition[] = [{
            title: "درخواست جدید", layout: { grid: { lg: 12 }, gridMode: "container" },
            elements: [
                {
                    type: "card",
                    layout: { grid: { lg: 12 }, gridMode: "item" },
                    config: {
                        card: {
                            actions: {
                                type: "section", layout: { type: "row", gridMode: "container" },
                                elements: [

                                    {
                                        type: "button", title: "ثبت",
                                    },
                                    {
                                        type: "button", title: "انصراف",
                                        config: {
                                            button: { color: "default" }
                                        },
                                    },
                                ],
                            }
                        }
                    },

                    elements: [
                        {
                            type: "section",
                            layout: { gridMode: "container", justify: "space-between" },
                            elements: [
                                {
                                    type: "section",
                                    layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                    elements: [
                                        {
                                            type: "section", title: "درخواست پشتیبانی", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                            elements: [
                                                {
                                                    type: "div", layout: { gridMode: "container" },
                                                    elements: [
                                                        {
                                                            type: "singleText", fullwidth: true, title: "عنوان درخواست",
                                                        },
                                                        {
                                                            type: "selectBox", title: "صفحه اینستاگرام", value: "", fullwidth: true,
                                                            config: {
                                                                selectBox: {
                                                                    optionList: [{ value: "amirrashidi", title: "amir rashidi" },
                                                                    { value: "amirrashidi", title: "amir rashidi" },
                                                                    { value: "amirrashidi", title: "amir rashidi" },
                                                                    { value: "amirrashidi", title: "amir rashidi" }],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            type: "selectBox", title: "اولویت", value: "", fullwidth: true,
                                                            config: {
                                                                selectBox: {
                                                                    optionList: [{ value: "1", title: "معمولی" },
                                                                    { value: "2", title: "مهم" },
                                                                    { value: "3", title: "بحرانی" }],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            type: "multiText", fullwidth: true, title: "شرح درخواست",
                                                            config: { multiText: { rows: 4 } },
                                                            style: { height: 150 },
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ],
                                },
                            ]
                        },
                    ],
                },

            ],
        }];
        return (
            <FormView title="   تیکت های پشتیبانی "
                        data={{ person: {}, educations: [{}], point: 0 }}
                        definitions={cartegoryDefinition} >
                    </FormView>
        );
    }
}
const mapStateToProps = ((state: any) => {
    return {
        payload: state.support.tickets.payload,
        pending: state.support.tickets.pending,
        form: state.support.tickets.form,
    };
});
export default connect(mapStateToProps)(TicketsFormView);
