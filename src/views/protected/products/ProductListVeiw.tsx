import * as React from "react";
import { TableView, FormDefinition, FormView } from "nowjs-react-material-ui";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { getAll } from "../../../redux/actions/product/listActions"
import ProductFormVeiw from "./ProductFormVeiw";


export interface ProductListVeiwPorps {
    dispatch?: ThunkDispatch<any, any, any>;
    payload?: any;
    pending?: boolean;
    form?: any
}
export interface ProductListVeiwStates {

}

class ProductListVeiw extends React.Component<ProductListVeiwPorps, ProductListVeiwStates> {
    constructor(props: ProductListVeiwPorps, states: ProductListVeiwStates) {
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
            <TableView title="محصولات من"
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
                    open: true, fullWidth: false, component: <ProductFormVeiw />
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
                    { propertyName: "thumbnail", title: "تصویر" },
                    { propertyName: "name", title: "نام محصول" },
                    { propertyName: "code", title: "کد محصول" },
                    { propertyName: "amount", title: "موجودی" },
                    {
                        title: "مدیریت", render: (n) => {
                            return (
                                <React.Fragment>
                                <IconButton key="veiw" aria-label="veiw" onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    // dispatch(showForm(n));
                                }}  >
                                    <Icon color="secondary" fontSize="small">edit</Icon>
                                </IconButton>
                                 <IconButton key="veiw" aria-label="veiw" onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    // dispatch(showForm(n));
                                }}  >
                                    <Icon color="error" fontSize="small">clear</Icon>
                                </IconButton>
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
        payload: state.product.list.payload,
        pending: state.product.list.pending,
        form: state.product.list.form,
    };
});
export default connect(mapStateToProps)(ProductListVeiw);
