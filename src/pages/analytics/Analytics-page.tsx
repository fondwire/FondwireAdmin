import React from 'react';
import Analytics from "../../components/analytics/Analytics";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
const Wrapper = styled.div`
  &>h3{
    font-size: 17px;
    letter-spacing: 1px;
    margin-bottom: 100px;
  }
`
function AnalyticsPage() {
    const {t} = useTranslation()
    return (
        <Wrapper>
            <h3>{t("assetManagerHomeScreen.analyticsLabel").toUpperCase()}</h3>
            <Analytics />
        </Wrapper>
    );
}

export default AnalyticsPage;