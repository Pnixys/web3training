import React, { useState } from 'react'
import Layout from '/components/Layout'
import { Form, Button, Message, FormField, Label, Input } from 'semantic-ui-react'
import { Link, Router } from '/routes'
import campaign from '/ethereum/campaign'
import web3 from '/ethereum/web3'

const RequestNew = ({address}) => {
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');

    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async event => {
        event.preventDefault();
        setIsSuccess(false);
        setProcessing(true);
        const currentCompaign = campaign(address.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await currentCompaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient).send({from:accounts[0]});
            setIsSuccess(true);
        }catch (err) {
            console.error(err.message);
            setErrorMessage(err.message);
        } finally {
            setProcessing(false);
        }
    };

  return (
    <Layout>
        <h3>Create a request</h3>
        <Form onSubmit={onSubmit} success={isSuccess} error={!!errorMessage}>
            <FormField>
                <Label>
                    Description
                </Label>
                <Input 
                    value={description}
                    onChange={event => setDescription(event.target.value)}/>
            </FormField>
            <FormField>
                <Label>
                    Value in ether
                </Label>
                <Input 
                    value={value}
                    onChange={event => setValue(event.target.value)} />
            </FormField>
            <FormField>
                <Label>
                    Recipient
                </Label>
                 <Input 
                    value={recipient}
                    onChange={event => setRecipient(event.target.value)} />
            </FormField>
            <Message error header='Oops!' content={errorMessage}></Message>
            <Message success header='Request created' content='The request is successufuly created'></Message>
            <Button primary loading={processing}>Create!</Button>
        </Form>
    </Layout>
  )
}

RequestNew.getInitialProps = async (context) => {
    return { address: context.query };
}

export default RequestNew