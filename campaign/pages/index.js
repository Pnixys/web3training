import React, { useEffect, useState } from 'react';
import factory from '../ethereum/factory';

const index = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      setCampaigns(await factory.methods.getDeployedCampaigns().call());
    }
  });

  return (
    <div>index page</div>
  )
}

export default index