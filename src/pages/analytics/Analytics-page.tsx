import React from 'react';
import Analytics from "../../components/analytics/Analytics";
import styled from "styled-components";
const Wrapper = styled.div`
  &>h3{
    font-size: 17px;
    letter-spacing: 1px;
    margin-bottom: 100px;
  }
`
function AnalyticsPage() {
    return (
        <Wrapper>
            <h3>ANALYTICS</h3>
            <Analytics />
        </Wrapper>
    );
}

export default AnalyticsPage;