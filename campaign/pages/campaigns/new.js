import React, { useState } from 'react'
import Layout from '/components/layout'
import { Button, Form, FormField, Input, Label, Message } from 'semantic-ui-react'
import web3 from 'ethereum/web3'
import factory from 'ethereum/factory'
import { Link, Router } from '/routes'

const CampaignNew = () => {
    const [minimumContributiuon, setMinimumContribution] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const accounts  = await web3.eth.getAccounts();
            setProcessing(true);
            await factory.methods.createCampaign(minimumContributiuon)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch(error) {
            console.error(error);
            setErrorMessage(error.message);
        }finally {
            setProcessing(false)
        }
        
    };

    const onValueChange = event => {
        setMinimumContribution(event.target.value)
        setErrorMessage('');
    }

  return (
    <Layout>
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <FormField>
                <Label>Minimum contribution</Label>
                <Input 
                    label='wei' 
                    placeholder={errorMessage} 
                    labelPosition='right'
                    onChange={onValueChange}/>
            </FormField>
            <Message error header='Oops!' content={errorMessage}/>
            <Button primary loading={processing}>Create</Button>
        </Form>
    </Layout>
  )
}

export default CampaignNew