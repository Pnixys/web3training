import React from 'react'
import Layout from '/components/layout'
import campaign from '/ethereum/campaign'
import { CardGroup, Grid, GridRow, GridColumn, Button} from 'semantic-ui-react';
import web3 from 'web3';
import ContributeForm from '/components/ContributeForm';
import { Link } from '/routes'

const show = ({props}) => {
  const renderCards = () => {

    const items = [{
      header: props.manager,
      meta: 'Address of Manager',
      description: 'The manager created this campaign and can create request',
      style: {overflowWrap: 'break-word'}
    },
    {
      header: props.minimumContribution,
      meta: 'Minimum amount required to contribute in wei',
      description: 'The minimum amount required to contribute to the campaign and become an approver',
    },
    {
      header: props.numberOfRequests,
      meta: 'number of request',
      description: 'The number of requests in the campaign'
    },
    {
      header: props.approversCount,
      meta: 'Number of approvers',
      description: 'Number of people who have already contribute to this campaign'
    },
    {
      header: web3.utils.fromWei(props.balance, 'ether'),
      meta: 'Campaign balance in ether',
      description: 'The balance is how much money has left to spend'
    }
  ];

    return <CardGroup items={items}/>
  };

  return (
    <Layout>
      <h3>Campaign show</h3>
      <Grid>
        <GridRow>
          <GridColumn width={10}>
            {renderCards()}
          </GridColumn>
          <GridColumn width={6}>
            <ContributeForm  address={props.address}/>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </GridColumn>
        </GridRow>
      </Grid>
    </Layout>
  )
}

show.getInitialProps = async (context) => {
  const campaignToShow = campaign(context.query.address);
  const summary = await campaignToShow.methods.getSummary().call();

  return { props:{
      address: context.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      numberOfRequests: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }
}

export default show