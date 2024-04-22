import { Alert, Button, Card, Col, Input, Row, Space } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Page } from '../types/Page';
import { useAtom } from 'jotai';
import queueList from '@/data/Queues';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { CreateQueueCustomerFormSchema, CreateQueueCustomerFormType } from '@/schemas/CreateQueueCustomerFormSchema';
import { useCallback, useState } from 'react';
import CreateQueueCustomerForm from '@/types/CreateQueueCustomerForm';


const IndexPage: Page = () => {
    const [queues, setQueues] = useAtom(queueList);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isUniqueError, setIsUniqueError] = useState(false);
    const [isCashierPop, setIsCashierPop] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm<CreateQueueCustomerFormType>({
        resolver: zodResolver(CreateQueueCustomerFormSchema),
        mode: 'onChange'
    })
    
    /**
     * Handles queue input form submission event
     * @param formData 
     */
    function onFormSubmit(formData: CreateQueueCustomerForm){
        const random = Math.floor(Math.random()*3);
        
        const isExist = queues.some(queue =>
            queue?.customers.some(customer => customer.name === formData.name)
        );
        if(!isExist){
            queues[random]?.customers.push(formData);
            setQueues(queues);
            console.log(queues);
            setIsAlertVisible(true);
        }
        else{
            setIsUniqueError(true);
        }
        
    }

    /**
     * Handles queue pop click event for each individual cashier
     */
    const handleCashier = useCallback((number)=>{
        setQueues(prevQueues => {
            const temp = [...prevQueues];
            temp[number]?.customers.shift();
            return temp;
        });
        setIsCashierPop(true);
    }, [setQueues]);
    

    return <Space direction='vertical' size={'middle'} style={{ display: 'flex' }}>
        <Row gutter={100}>
            <Col span={8}>
                <Card><b>Cashier 1</b></Card>
                {queues[0] && queues[0].customers.slice(0, 3).map((customer, index)=>{
                    return <Card key={index}>{customer.name}</Card>
                })}
                {queues[0] && queues[0].customers.length > 3 && (
                    <Card key="more">and {queues[0].customers.length - 3} more...</Card>
                )}
            </Col>
            <Col span={8}>
                <Card><b>Cashier 2</b></Card>
                {queues[1] && queues[1].customers.slice(0, 3).map((customer, index)=>{
                    return <Card key={index}>{customer.name}</Card>
                })}
                {queues[1] && queues[1].customers.length > 3 && (
                    <Card key="more">and {queues[1].customers.length - 3} more...</Card>
                )}
            </Col>
            <Col span={8}>
                <Card><b>Cashier 3</b></Card>
                {queues[2] && queues[2].customers.slice(0, 3).map((customer, index)=>{
                    return <Card key={index}>{customer.name}</Card>
                })}
                {queues[2] && queues[2].customers.length > 3 && (
                    <Card key="more">and {queues[2].customers.length - 3} more...</Card>
                )}
            </Col>
        </Row>
        <Row >
            <Col span={24}>
                <Row gutter={100}>
                    <Col span={12}>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Space direction='vertical' size={'small'} style={{ display: 'flex' }}>
                                <Controller name="name"
                                control={control}
                                render={({field}) => 
                                    <Input id="name" placeholder='input customer name...' addonBefore="Name: "{...field}/>
                                }/>
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                                
                                <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                            </Space>
                        </form>
                        {isAlertVisible &&
                        <Row>
                            <Col span={24}>
                                <Alert
                                    message="Customer added!"
                                    type="success"
                                    closable
                                    onClose={() => setIsAlertVisible(false)}
                                />
                            </Col>
                        </Row>
                        }
                        {isUniqueError &&
                        <Row>
                            <Col span={24}>
                                <Alert
                                    message="Customer already exists!"
                                    type="error"
                                    closable
                                    onClose={() => setIsUniqueError(false)}
                                />
                            </Col>
                        </Row>
                        }
                    </Col>
                    <Col span={12}>
                        <Row >
                            <Button onClick={()=>handleCashier(0) } className="bg-blue-500 hover:bg-blue-200">Handle Cashier #1</Button>
                        </Row>
                        <Row >
                            <Button onClick={()=>handleCashier(1)} className="bg-blue-500 hover:bg-blue-200">Handle Cashier #2</Button>
                        </Row>
                        <Row>
                            <Button onClick={()=>handleCashier(2)} className="bg-blue-500 hover:bg-blue-200">Handle Cashier #3</Button>
                        </Row>
                        {isCashierPop &&
                        <Row>
                            <Col span={24}>
                                <Alert
                                    message="Cashier handled!"
                                    type="success"
                                    closable
                                    onClose={() => setIsCashierPop(false)}
                                />
                            </Col>
                        </Row>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    </Space>
}



IndexPage.layout = WithDefaultLayout;
export default IndexPage;
