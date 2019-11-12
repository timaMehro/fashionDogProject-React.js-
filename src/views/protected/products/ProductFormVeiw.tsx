import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon, Typography } from "@material-ui/core";
import { getAll } from "../../../redux/actions/product/factorActions"


export interface ProductFormVeiwPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface ProductFormVeiwStates {

}

class ProductFormVeiw extends React.Component<ProductFormVeiwPorps, ProductFormVeiwStates> {
    constructor(props: ProductFormVeiwPorps, states: ProductFormVeiwStates) {
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
                                type: "grid", layout: { type: "row", gridMode: "container" },
                                elements: [
                                    {
                                        type: "grid",
                                        layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
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
                                        ]
                                    },
                                ],
                            }
                        }
                    },

                    elements: [
                        {
                            type: "grid",
                            layout: { gridMode: "container", justify: "space-between" },
                            elements: [
                                {
                                    type: "grid",
                                    layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                    elements: [
                                        {
                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                            elements: [
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "کد محصول",
                                                        },
                                                        {
                                                            type: "radioBox", title: "رنگ کالا", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true,
                                                            config: {
                                                                radioBox:
                                                                {
                                                                    direction: "row",
                                                                    optionList: [
                                                                        { value: "1", title: "آبی" },
                                                                        { value: "2", title: "سبز" },
                                                                        { value: "3", title: "قرمز" },
                                                                    ]
                                                                }

                                                            }
                                                        },
                                                    ]
                                                },
                                            
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "tagBox", title: "سایز", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true,
                                                            config: {
                                                                tagBox:
                                                                {
                                                                    direction: "row",
                                                                    optionList: [
                                                                        { value: "1", label: 31 },
                                                                        { value: "2", label: 32 },
                                                                        { value: "3", label: 33 },
                                                                        { value: "4", label: 34 },
                                                                        { value: "5", label: 35 },
                                                                    ]
                                                                }

                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    type: "singleText",
                                                    layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true, title: "تعداد",
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
            <FormView title="ثبت فاکتور جدید"
                data={{ person: {}, educations: [{}], point: 0 }}
                definitions={cartegoryDefinition} >
            </FormView>
        );
    }
}
const mapStateToProps = ((state: any) => {
    return {
    };
});
export default connect(mapStateToProps)(ProductFormVeiw);
