import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon, Typography } from "@material-ui/core";
import { getAll } from "../../../redux/actions/product/factorActions"


export interface FactorFormVeiwPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface FactorFormVeiwStates {

}

class FactorFormVeiw extends React.Component<FactorFormVeiwPorps, FactorFormVeiwStates> {
    constructor(props: FactorFormVeiwPorps, states: FactorFormVeiwStates) {
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
                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                    elements: [
                                        {
                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                            elements: [
                                                {
                                                    type: "singleText",
                                                    layout: { grid: { lg: 6, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true, title: "کد کالا",
                                                },
                                                {
                                                    type: "date", locale: "fa",
                                                    layout: { grid: { lg: 6, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true, title: "تاریخ",
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    type: "grid",
                                    layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                    elements: [
                                        {
                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                            elements: [
                                                {
                                                    type: "grid", layout: { grid: { lg: 9, xs: 12 }, gridMode: "item", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "label",
                                                            layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "نام محصول",
                                                            config: {
                                                                label: {
                                                                    size: "h1"
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: "radioBox", title: "رنگ کالا", layout: { grid: { lg: 6, xs: 12 }, gridMode: "item" }
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
                                                    type: "grid", layout: { grid: { lg: 3, xs: 12 }, gridMode: "item", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "avatarBox",
                                                            layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "کد کالا",
                                                        },
                                                    ]
                                                },
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "selectBox", title: "سایز", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true,
                                                            config: {
                                                                selectBox:
                                                                {
                                                                    direction: "row",
                                                                    optionList: [
                                                                        { value: "1", title: "اشخاص" },
                                                                        { value: "2", title: "هزینه" },
                                                                        { value: "3", title: "بانک" },
                                                                        { value: "4", title: "صندوق" },
                                                                        { value: "5", title: "مرکب" },
                                                                    ]
                                                                }

                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "شهر",
                                                        },
                                                        {
                                                            type: "selectBox", title: "فروشگاه", layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true,
                                                            config: {
                                                                selectBox:
                                                                {
                                                                    direction: "row",
                                                                    optionList: [
                                                                        { value: "1", title: "نام فروشگاه" },
                                                                    ]
                                                                }

                                                            }
                                                        },
                                                        {
                                                            type: "singleText",
                                                            layout: { grid: { lg: 4, xs: 12 }, gridMode: "item" }
                                                            , fullwidth: true, title: "قیمت",
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center", justify: "center" },
                                    elements: [
                                        {
                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                            elements: [
                                                {
                                                    type: "label", title: "با ثبت نظر خود در ارائه خدمات این برند ما را همراهی کنید", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "فروشنده ضمانت نامه به من داد" },
                                                                { value: "2", title: "فروشنده ضمانت نامه به من نداد" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "رفتار فروشنده محترمانه بود" },
                                                                { value: "2", title: "رفتار فروشنده نامحترمانه بود" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "خیلی خوب راهنمایی کردند" },
                                                                { value: "2", title: "خیلی بد راهنمایی کردند" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "فروشگاه بسیار زیبا و تمیز بود" },
                                                                { value: "2", title: "فروشگاه بسیار شلوغ و کثیف بود" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "چیدمان و دسترسی عالی بود" },
                                                                { value: "2", title: "چیدمان و دسارسی بد بود" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "به من تخفیف دادند" },
                                                                { value: "2", title: "به من تخفیف ندادند" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "به من اشانتیون دادند" },
                                                                { value: "2", title: "به من اشانتیون ندادند" },
                                                            ]
                                                        }

                                                    }
                                                },
                                                {
                                                    type: "radioBox", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" }
                                                    , fullwidth: true,
                                                    config: {
                                                        radioBox:
                                                        {
                                                            direction: "row",
                                                            optionList: [
                                                                { value: "1", title: "دکور فروشگاه جذاب بود" },
                                                                { value: "2", title: "دکور فروشگاه ضعیف بود" },
                                                            ]
                                                        }

                                                    }
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center", justify: "center" },
                                    elements: [
                                        {
                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                            elements: [
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "item" },
                                                    config: {
                                                        custom: {
                                                            render() {
                                                                return (
                                                                    <React.Fragment>
                                                                        <Typography variant="body1">
                                                                            با سپاس از حسن انتخاب شما در برگزيدن برند فشن‌داگ به اطلاع شما مي‌رسانيم کلیه‌ی کفش‌های فشن‌داگ طبی بوده مطابق استانداردهای سلامت پا و از مواد اولیه مرغوب تولید می‌شوند. مواد استفاده شده در تولید کفش‌های فشن‌داگ قابل بازیافت بوده و لذا محصولی دوست‌دار طبیعت به شمار می‌آید. شایان ذکر است که تمام کفش‌های برند فشن داگ دارای کارت گارانتی 6 ماهه هستند که بعد از درج تاریخ خرید توسط فروشنده دارای اعتبار می‌باشند.
                                                                    </Typography>
                                                                        <Typography variant="h4">
                                                                            شرایط ضمانت                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            همراه داشتن کارت گارانتی برای استفاده از خدمات گارانتی الزامی است.
        تنها ایرادهای فنی کفش (مانند جدا شدن رویه از کفی، پوسته پوسته شدن رویه کفش، باز شدن دوخت و ...) شامل گارانتی 6 ماهه است و در صورت استفاده نامتعارف و نادرست (ضربه زدن یا سائیدن کفش به سطوح ناهموار) گارانتی شامل محصولات نمی‌شود.
        هنگام خرید دقت فرمایید که کفش سایز مناسب پای کودک خود را انتخاب کنید، نمایندگی‌ها مسئولیتی در قبال زده شدن پا در کفش و کوچک بودن ان بعد از خرید ندارند.
                                                                    </Typography>
                                                                        <Typography variant="h4">
                                                                            فرآیند گارانتی
                                                                             </Typography>
                                                                        <Typography variant="body2">
                                                                            بعد از تحویل کفش‌های دارای مشکل به نمایندگی و تائید توسط نمایندگی بلافاصله تعویض انجام می‌گیرد. به منظور رعایت مسائل بهداشتی، ضروریست قبل از تحویل محصول به نمایندگی‌ها و عاملیت‌های فروش، آن‌ها را کاملاً تمیز فرمائید.
                                                                         </Typography>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        }
                                                    },

                                                },
                                                {
                                                    type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                                    elements: [
                                                        {
                                                            type: "grid", layout: { grid: { lg: 12, xs: 12 }, gridMode: "container", alignItems: "center" },
                                                            elements: [
                                                                {
                                                                    type: "checkedBox", layout: { grid: { lg: 6, xs: 12 }, gridMode: "item" }
                                                                    , fullwidth: true,
                                                                    config: {
                                                                        checkedBox:
                                                                        {
                                                                            direction: "row",
                                                                            labelPlacement:"end",
                                                                            optionList: [
                                                                                { value: "1", title: "شرایط ضمانت نامه را خواندم و قبول دارم" },
                                                                            ]
                                                                        }
                
                                                                    }
                                                                },
                                                                {
                                                                    type: "singleText",
                                                                    layout: { grid: { lg: 6, xs: 12 }, gridMode: "item" }
                                                                    , fullwidth: true, title: "شماره ضمانتنامه",
                                                                },
                                                            ]
                                                        },
                                                    ],
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
export default connect(mapStateToProps)(FactorFormVeiw);
