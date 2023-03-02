import React, { useEffect, useState } from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';

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
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      {renderCampaigns()}
      <Button 
        content="Create campaign"
        icon="add circle"
        primary/>
    </div>
  )
}

export default index