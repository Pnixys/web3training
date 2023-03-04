import React from 'react'
import Layout from '/components/Layout'
import { Link } from '/routes'
import { Button } from 'semantic-ui-react'

const  RequestsIndex = ({address}) => {
  return (
    <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${address.address}/requests/new`}>
            <a>
                <Button primary>Add request</Button>
            </a>
        </Link>
    </Layout>
  )
}

RequestsIndex.getInitialProps = async context => {
    return { address: context.query }
};

export default RequestsIndex