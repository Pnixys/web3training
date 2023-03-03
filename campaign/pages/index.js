import React, { useEffect, useState } from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/layout';

const index = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      setCampaigns(await factory.methods.getDeployedCampaigns().call());
    }
    fetchCampaigns();
  }, []);

  const renderCampaigns = () => {
    const items = campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    });

    return <Card.Group items={items}/>;
  };

  return (
    <Layout>
      <div style={{margin: '5px'}}>
        <h2>Open campaigns</h2>
        <Button 
          content="Create campaign"
          icon="add circle"
          floated='right'
          primary/>
          {renderCampaigns()}
      </div>
    </Layout>
  )
}

export default index