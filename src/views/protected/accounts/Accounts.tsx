import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { getAll } from "../../../redux/actions/accounts/accountsActions"


export interface AccountViewPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface AccountViewStates {

}

class AccountView extends React.Component<AccountViewPorps, AccountViewStates> {
    constructor(props: AccountViewPorps, states: AccountViewStates) {
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
            title: "     سفارش ها  ", layout: { grid: { lg: 12 }, gridMode: "container" },
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
                                    layout: { grid: { lg: 8, xs: 12 }, gridMode: "item" },
                                    elements: [
                                        {
                                            type: "section", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                            elements: [
                                                {
                                                    type: "div", layout: { gridMode: "container" },
                                                    elements: [
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 3, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "کد",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 9, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "شرح کد",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "آدرس",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "تلفن",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "فکس",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "تلفن همراه",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "کد مالی",
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 8, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "توضیحات",
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    type: "section", layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" },
                                    elements: [
                                        {
                                            type: "div", layout: { gridMode: "container" },
                                            elements: [
                                                {
                                                    type: "selectBox", title: "نوع حساب", value: "", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        selectBox:
                                                        {
                                                            optionList :[
                                                            { value: "1", title: "بستانکاران متفرقه" },
                                                            { value: "2", title: "بستانکاران متفرقه" },
                                                            { value: "3", title: "بستانکاران متفرقه" },
                                                        ]}

                                                    }
                                                },
                                                {
                                                    type: "singleText", title: "کد ملی", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                },
                                                {
                                                    type: "singleText", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true, title: "ایمیل",
                                                },
                                            ]
                                        },


                                    ]
                                },
                            ]
                        },
                    ],
                },

            ],
        }];
        return (
            <TableView title="معرفی حساب ها"
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
                    open: false, fullWidth: false, component: <FormView title="   تیکت های پشتیبانی "
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
                    { propertyName: "code", title: "کد" },
                    { propertyName: "describtion", title: "توضیحات" },
                    { propertyName: "debtTurnover", title: "بدهکاری در گردش" },
                    { propertyName: "creditorTurnover", title: "بستانکاری در گردش" },
                    { propertyName: "debtBalance", title: "مانده بدهکاری" },
                    { propertyName: "creditorBalance", title: "مانده بستانکاری" },
                    {
                        title: "", render: (n) => {
                            return (
                                <IconButton key="edit" aria-label="Edit" onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    // dispatch(showForm(n));
                                }}  >
                                    <Icon color="action" fontSize="small">edit</Icon>
                                </IconButton>
                            );
                        },
                    },
                ]} />
        );
    }
}
const mapStateToProps = ((state: any) => {
    return {
        payload: state.accounting.personalAccount.payload,
        pending: state.accounting.personalAccount.pending,
        form: state.accounting.personalAccount.form,
    };
});
export default connect(mapStateToProps)(AccountView);
