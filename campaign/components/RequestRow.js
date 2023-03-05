import React, { useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '/ethereum/web3'
import campaign from '/ethereum/campaign'

const RequestRow = ({index, address, request, approversCount}) => {
    const {Cell, Row } = Table;

    const [approveProcessing, setApproveProcessing] = useState(false);
    const [finalizeProcessing, setFinalizeProcessing] = useState(false);
    const readyToFinalize = request.approvalCount > approversCount / 2;

    const onApprove = async () => {
        const currentCampaign = campaign(address);
        setApproveProcessing(true);
        console.log(index)

        try {
            const accounts = await web3.eth.getAccounts();
            await currentCampaign.methods.approveRequest(index).send({
                from:accounts[0]
            });
        } catch (err) {
            console.error(err.message);
        } finally {
            setApproveProcessing(false);
        }
    };

    const onFinalize = async () => {
        setFinalizeProcessing(true);
        try {
            const accounts = await web3.eth.getAccounts();
            const currentCampaign = campaign(address);
            await currentCampaign.methods.finalizeRequest(index).send({
                from: accounts[0]
            });
        } catch (err) {
            console.error(err);
        } finally {
            setFinalizeProcessing(false);
        }
    };

  return (
    <Row disabled={request.complete} positive={!request.complete && readyToFinalize}>
        <Cell>{index}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount} / {approversCount}</Cell>
        {!request.complete && <Cell><Button color='green' loading={approveProcessing} onClick={onApprove}>Approve</Button></Cell>}
        {!request.complete && <Cell><Button color='teal' loading={finalizeProcessing} onClick={onFinalize}>Finalize</Button></Cell>}
    </Row>
  )
}

export default RequestRow