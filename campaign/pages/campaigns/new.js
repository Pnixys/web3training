import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Form, FormField, Input, Label, Message } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import factory from '../../ethereum/factory'

const CampaignNew = () => {
    const [minimumContributiuon, setMinimumContribution] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault()
        const accounts  = await web3.eth.getAccounts();

        try {
            setProcessing(true);
            await factory.methods.createCampaign(minimumContributiuon)
                .send({
                    from: accounts[0]
                });
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