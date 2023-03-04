import React, {useState} from 'react'
import { Button, Form, FormField, Input, Message } from 'semantic-ui-react'
import campaign from '/ethereum/campaign'
import web3 from '/ethereum/web3'
import { Router } from '/routes' 

const ContributeForm = ({address}) => {
    const [value, setValue] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const currentCampaign = campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await currentCampaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            setIsSuccess(true)
            Router.replaceRoute(`/campaigns/${address}`);
        }catch (err) {
            console.error(err);
            setErrorMessage(err.message)
            setIsSuccess(false);
        } finally {
            setProcessing(false);
        }
    };

  return (
    <Form onSubmit={onSubmit} success={isSuccess} error={!!errorMessage}>
        <FormField>
            <label>Amount to contribute</label>
            <Input
                value={value}
                onChange={(event) => setValue(event.target.value)} 
                label='ether' 
                labelPosition='right'/>
        </FormField>
        <Message error header='Oops!' content={errorMessage}/>
        <Message success header='Transaction confirmed !' content='Your are now a contributor to this campaign.'/> 
        <Button primary loading={processing}>
            Contribute!
        </Button>
    </Form>
  )
}

export default ContributeForm