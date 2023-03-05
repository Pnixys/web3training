import React from 'react'
import Layout from '/components/Layout'
import { Link } from '/routes'
import { Button, Table, TableHeader } from 'semantic-ui-react'
import campaign from '/ethereum/campaign'
import RequestRow from '/components/RequestRow'

const  RequestsIndex = ({address, requests, requestsCount, approversCount}) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return requests.map((request, index) => {
      return <RequestRow
      key={index}
      index={index}
      address={address} 
      request={request}
      approversCount={approversCount}/>
    })
  }
  return (
    <Layout>
        <h3>Requests</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>

          <Body>
            {renderRow()}
          </Body>
        </Table>
        <Link route={`/campaigns/${address}/requests/new`}>
            <a>
                <Button primary>Add request</Button>
            </a>
        </Link>
    </Layout>
  )
}

RequestsIndex.getInitialProps = async context => {
  const { address } = context.query;
  const currentCampaign = campaign(address);
  const requestsCount = await currentCampaign.methods.numberOfRequest().call();
  const approversCount = await currentCampaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestsCount)).fill().map((element, index) => {
      return currentCampaign.methods.requests(index).call()
    })
  );
  return { address, requests, requestsCount, approversCount }
};

export default RequestsIndex