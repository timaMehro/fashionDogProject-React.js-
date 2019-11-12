import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { getAll } from "../../../redux/actions/product/factorActions"
import FactorFormVeiw from "./FactorFormVeiw";


export interface FactorListVeiwPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface FactorListVeiwStates {

}

class FactorListVeiw extends React.Component<FactorListVeiwPorps, FactorListVeiwStates> {
    constructor(props: FactorListVeiwPorps, states: FactorListVeiwStates) {
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
        return (
            <TableView title="فاکتورهای من"
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
                    open: false, fullWidth: false, component: <FactorFormVeiw />
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
                    { propertyName: "city", title: "شهر" },
                    { propertyName: "shop", title: "فروشگاه" },
                    { propertyName: "date", title: "تاریخ فاکتور" },
                    { propertyName: "status", title: "وضعیت" },
                    {
                        title: "", render: (n) => {
                            return (
                                <IconButton key="veiw" aria-label="veiw" onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    // dispatch(showForm(n));
                                }}  >
                                    <Icon color="action" fontSize="small">receipt</Icon>
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
        payload: state.product.factor.payload,
        pending: state.product.factor.pending,
        form: state.product.factor.form,
    };
});
export default connect(mapStateToProps)(FactorListVeiw);
