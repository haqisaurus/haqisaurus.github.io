import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, notification, Checkbox, Row, Col } from 'antd'
import { updateStore } from '../../../service/StoreService';
import { FormInstance } from 'antd/lib/form';
import { getDeliveryServices } from '../../../service/DeliveryService';
import { IStore, IDelivery } from '../../../typed/Entity';
interface IProps {
    currentStore: IStore;
    setCurrentStore: (x: any) => void;
}
interface IState {
    deliveryServices: IDelivery[],
    deliverySupport?: boolean;

}
class ShippingForm extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();

    state = {
        deliveryServices: [],
        deliverySupport: this.props.currentStore.delivery_support,
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };
    async componentDidMount () {
        const deliveryServices = await getDeliveryServices()
        this.setState({
            deliveryServices: deliveryServices.data,
        });
    }
    _onSubmit = async (values: any) => {
        values.deli_services = values.deli_services.map((item: any) => ({id: item}))
        const data = {...this.props.currentStore, ...values}
        console.log(data)
        // values.id = this.props.currentStore.id;
        try {
            const result = await updateStore(data);
            if (!result.header.ok) {
                Modal.error({
                    title: 'Error!',
                    content: result.header.statusText,
                });
                return;
            }
            this.props.setCurrentStore(result.data);
            notification.success({
                message: `Notifikasi!`,
                description: 'Toko sukses diupdate.',
            });
        } catch (error) {
            console.log(error);
        }
    }
   
    _onFailed = () => {

    }
    render () {
        return (
            <Form
                {...this.layout}
                name="basic"
                initialValues={{
                    delivery_support: this.props.currentStore.delivery_support,
                    deli_services: this.props.currentStore.deli_services?.map((item: IDelivery) => item.id)
                }}
                onFinish={this._onSubmit}
                onFinishFailed={this._onFailed}
                ref={this.formRef}
            >
                <Form.Item {...this.tailLayout} name="delivery_support" valuePropName="checked">
                    <Checkbox onChange={(e: any) => {
                        this.formRef.current?.setFieldsValue({ delivery_support: e.target.checked })
                        this.setState({ deliverySupport: e.target.checked });
                        if (e.target.checked === false) {
                            this.formRef.current?.setFieldsValue({ deli_services: [] })
                        }
                    }}>Aktifkan Pengiriman </Checkbox>
                </Form.Item>
                <Form.Item name="deli_services" label="pilihan pengiriman" >
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {this.state.deliveryServices.map((item: IDelivery, key: number) => (
                                <Col span={8} key={`check-${key}`}>
                                    <Checkbox disabled={this.state.deliverySupport === false} value={item.id} style={{ lineHeight: '32px' }}>
                                        {item.service}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item {...this.tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        Simpan
                    </Button>
                </Form.Item>
            </Form>

        )
    }
}

const mapStateToProps = (state: any) => ({
    currentStore: state.store.currentStore
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setCurrentStore: (payload: any) => dispatch({ type: 'SET_STORE', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)

