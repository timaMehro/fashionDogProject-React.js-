import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { getAll } from "../../../redux/actions/support/ticketsActions"


export interface TicketsListViewPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface TicketsListViewStates {

}

class TicketsListView extends React.Component<TicketsListViewPorps, TicketsListViewStates> {
    constructor(props: TicketsListViewPorps, states: TicketsListViewStates) {
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
            <TableView title="فهرست درخواست های من"
                data={this.props.payload.data}
                pending={this.props.pending}
                onReloadData={this.reloadData.bind(this)}
                page={this.props.payload.page}
                limit={this.props.payload.limit}
                total={this.props.payload.total}
                selectionMode="multi"
                remoteSearching={true}
                remoteFiltering={true}
                remotePaging={true}
                remoteSorting={true}
                showSearch={false}
                showFilter={true}
                dialog={{
                    open: true, fullWidth: false, component: <FormView title="   تیکت های پشتیبانی "
                        data={{ person: {}, educations: [{}], point: 0 }}
                        definitions={cartegoryDefinition} >
                    </FormView>
                }}
                toolbarActionItems={(
                    <React.Fragment>
                        <Tooltip title="Add">
                            <IconButton aria-label="Add" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // dispatch(showForm())
                            }} >
                                <Icon color="primary">add_circle</Icon>
                            </IconButton>
                        </Tooltip>

                    </React.Fragment>

                )}
                columns={[
                    { propertyName: "id", title: "Id", visible: false },
                    { propertyName: "ticketNo", title: "شماره درخواست" },
                    { propertyName: "name", title: "عنوان درخواست" },
                    { propertyName: "accountName", title: "صفحه مرتبط" },
                    { propertyName: "lastAnswer", title: "آخرین پاسخ" },
                    { propertyName: "status", title: "وضعیت" },
                    { propertyName: "createDate", title: "تاریخ ایجاد" },
                    { propertyName: "lastAnswerDate", title: "تاریخ آخرین پاسخ" },
                    {
                        title: "عملیات", render: (n) => {
                            return (
                                <React.Fragment>
                                    <Tooltip title="پاسخ جدید">
                                    <IconButton key="answer" aria-label="answer" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        // dispatch(showForm(n));
                                    }}  >
                                        <Icon color="action" fontSize="small">question_answer</Icon>
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="بستن درخواست">
                                    <IconButton key="close" aria-label="close" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        // dispatch(showForm(n));
                                    }}  >
                                        <Icon color="error" fontSize="small">assignment_turned_in</Icon>
                                    </IconButton>
                                    </Tooltip>
                                </React.Fragment>
                            );
                        },
                    },
                ]} />
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
export default connect(mapStateToProps)(TicketsListView);
